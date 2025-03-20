"use server";

import connectDB from "../lib/connectDB";
import Quarter from "../model/quarter";
import { QuarterTitle } from "../types/matrixTypes";

export async function getQuartersFromDB() {
  await connectDB();
  const quarters = await Quarter.find({});
  const serializedQuarters = JSON.parse(JSON.stringify(quarters));
  return serializedQuarters;
}

export async function addTaskToDB(quarterTitle: QuarterTitle, taskTitle: string, taskPosition: number) {
  await connectDB();
  await Quarter.updateOne({ quarterTitle }, { $push: { tasks: { taskTitle: taskTitle, taskPosition: taskPosition } } });
}

// export async function removeTaskFromDB(positionActiveTask: number, quarterActiveTask: QuarterTitle) {
//   await connectDB();
//   await Task.deleteOne({ positionActiveTask, quarterActiveTask });
//   await Task.updateMany(
//     { quarterActiveTask, positionActiveTask: { $gte: positionActiveTask } },
//     { $inc: { positionActiveTask: -1 } }
//   );
// }

// export async function moveTaskInMatrixDB(
//   quarterActiveTask: QuarterTitle,
//   positionActiveTask: number,
//   quarterTitle: QuarterTitle,
//   calculatedPosition: number
// ) {
//   await connectDB();
//   await Task.updateMany(
//     { quarterActiveTask, positionActiveTask: { $gt: positionActiveTask } },
//     { $inc: { positionActiveTask: -1 } }
//   );
//   await Task.updateMany(
//     { quarterActiveTask: quarterTitle, positionActiveTask: { $gte: calculatedPosition } },
//     { $inc: { positionActiveTask: 1 } }
//   );
//   await Task.updateOne(
//     { quarterActiveTask, positionActiveTask },
//     { $set: { quarterActiveTask: quarterTitle, positionActiveTask: calculatedPosition } }
//   );
// }
