"use server";

import connectDB from "../lib/connectDB";
import Task from "../model/task";
import { QuarterTitle } from "../types/matrixTypes";

export async function addTaskToDB(title: string, positionActiveTask: number, quarterActiveTask: QuarterTitle) {
  await connectDB();
  await Task.create({
    title,
    positionActiveTask,
    quarterActiveTask,
  });
}

export async function removeTaskFromDB(positionActiveTask: number, quarterActiveTask: QuarterTitle) {
  await connectDB();
  await Task.deleteOne({ positionActiveTask, quarterActiveTask });
  await Task.updateMany(
    { quarterActiveTask, positionActiveTask: { $gte: positionActiveTask } },
    { $inc: { positionActiveTask: -1 } }
  );
}

export async function moveTaskInMatrixDB(
  quarterActiveTask: QuarterTitle,
  positionActiveTask: number,
  quarterTitle: QuarterTitle,
  calculatedPosition: number
) {
  await connectDB();
  await Task.updateMany(
    { quarterActiveTask, positionActiveTask: { $gt: positionActiveTask } },
    { $inc: { positionActiveTask: -1 } }
  );
  await Task.updateMany(
    { quarterActiveTask: quarterTitle, positionActiveTask: { $gte: calculatedPosition } },
    { $inc: { positionActiveTask: 1 } }
  );
  await Task.updateOne(
    { quarterActiveTask, positionActiveTask },
    { $set: { quarterActiveTask: quarterTitle, positionActiveTask: calculatedPosition } }
  );
}
