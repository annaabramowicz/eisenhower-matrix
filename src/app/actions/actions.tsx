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
  await Quarter.updateOne(
    { quarterTitle },
    {
      $push: {
        tasks: {
          $each: [{ taskTitle: taskTitle, taskPosition: taskPosition }],
          $position: taskPosition,
        },
      },
    }
  );
}

export async function removeTaskFromDB(taskPosition: number, quarterTitle: QuarterTitle) {
  await connectDB();
  // throw new Error("Error establishing a database connection");

  await Quarter.updateOne({ quarterTitle }, { $pull: { tasks: { taskPosition: taskPosition } } });
}

export async function incrementTaskPositionInDB(quarterTitle: QuarterTitle, taskPosition: number) {
  await connectDB();
  await Quarter.updateOne(
    { quarterTitle },
    { $inc: { "tasks.$[elem].taskPosition": 1 } },
    { arrayFilters: [{ "elem.taskPosition": { $gte: taskPosition } }] }
  );
}

export async function decrementTaskPositionInDB(positionActiveTask: number, quarterActiveTask: QuarterTitle) {
  await connectDB();
  await Quarter.updateOne(
    { quarterTitle: quarterActiveTask },
    { $inc: { "tasks.$[elem].taskPosition": -1 } },
    { arrayFilters: [{ "elem.taskPosition": { $gt: positionActiveTask } }] }
  );
}
