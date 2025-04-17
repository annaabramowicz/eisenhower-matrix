"use server";

import { withTransaction } from "../helpers/withTransaction";
import connectDB from "../lib/connectDB";
import Quarter from "../model/quarter";
import { QuarterTitle, Task } from "../types/matrixTypes";

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

export async function removeTaskFromDB(quarterTitle: QuarterTitle, taskID: number) {
  await Quarter.updateOne({ quarterTitle }, { $pull: { tasks: { _id: taskID } } });
}

export async function moveTaskInDB(
  targetQuarter: string,
  task: Task,
  calculatedPosition: number,
  quarterActiveTask: QuarterTitle
) {
  await withTransaction(async (session) => {
    await Quarter.updateOne({ quarterTitle: quarterActiveTask }, { $pull: { tasks: { _id: task._id } } }, { session });
    await Quarter.updateOne(
      { quarterTitle: targetQuarter },
      {
        $push: {
          tasks: {
            $each: [{ taskTitle: task.taskTitle }],
            $position: calculatedPosition,
          },
        },
      },
      { session }
    );
  });
}
