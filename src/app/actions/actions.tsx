"use server";

import mongoose from "mongoose";
import { withTransaction } from "../helpers/withTransaction";
import connectDB from "../lib/connectDB";
import Quarter from "../model/quarter";
import { QuarterTitle, Task } from "../types/matrixTypes";

await connectDB();

export async function getQuartersAction() {
  const quarters = await Quarter.find({});
  const serializedQuarters = JSON.parse(JSON.stringify(quarters));
  return serializedQuarters;
}

export async function addTaskAction(quarterTitle: QuarterTitle, taskTitle: string, taskPosition: number) {
  const taskId = new mongoose.Types.ObjectId();

  await Quarter.updateOne(
    { quarterTitle },
    {
      $push: {
        tasks: {
          $each: [{ _id: taskId, taskTitle: taskTitle }],
          $position: taskPosition,
        },
      },
    }
  );
  return { insertedID: taskId.toString() };
}

export async function removeTaskFromDB(quarterTitle: QuarterTitle, taskID: string) {
  await Quarter.updateOne({ quarterTitle }, { $pull: { tasks: { _id: taskID } } });
}

export async function moveTaskAction(
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
