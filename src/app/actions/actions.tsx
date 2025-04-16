"use server";

import { withTransaction } from "../helpers/withTransaction";
import connectDB from "../lib/connectDB";
import Quarter from "../model/quarter";
import { QuarterTitle } from "../types/matrixTypes";

await connectDB();

export async function getQuartersFromDB() {
  const quarters = await Quarter.find({});
  const serializedQuarters = JSON.parse(JSON.stringify(quarters));
  return serializedQuarters;
}

export async function addTaskToDB(quarterTitle: QuarterTitle, taskTitle: string, taskPosition: number) {
  await Quarter.updateOne(
    { quarterTitle },
    {
      $push: {
        tasks: {
          $each: [{ taskTitle: taskTitle }],
          $position: taskPosition,
        },
      },
    }
  );
}

export async function removeTaskFromDB(taskPosition: number, quarterTitle: QuarterTitle) {
  await Quarter.updateOne({ quarterTitle }, { $pull: { tasks: { taskPosition: taskPosition } } });
}

export async function moveTaskInDB(
  positionActiveTask: number,
  targetQuarter: string,
  taskTitle: string,
  calculatedPosition: number,
  quarterActiveTask: QuarterTitle
) {
  await withTransaction(async (session) => {
    await Quarter.updateOne(
      { quarterTitle: quarterActiveTask },
      { $pull: { tasks: { taskPosition: positionActiveTask } } },
      { session }
    );
    await Quarter.updateOne(
      { quarterTitle: targetQuarter },
      {
        $push: {
          tasks: {
            $each: [{ taskTitle: taskTitle }],
            $position: calculatedPosition,
          },
        },
      },
      { session }
    );
  });
}
