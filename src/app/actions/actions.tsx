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
  const session = await Quarter.startSession();
  session.startTransaction();
  try {
    await Quarter.updateOne({ quarterTitle }, { $pull: { tasks: { taskPosition: taskPosition } } }, { session });
    await Quarter.updateOne(
      { quarterTitle },
      { $inc: { "tasks.$[elem].taskPosition": -1 } },
      { arrayFilters: [{ "elem.taskPosition": { $gt: taskPosition } }], session }
    );
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

export async function moveTaskInDB(
  positionActiveTask: number,
  targetQuarter: string,
  taskTitle: string,
  calculatedPosition: number,
  quarterActiveTask: QuarterTitle
) {
  await connectDB();
  const session = await Quarter.startSession();
  session.startTransaction();
  try {
    await Quarter.updateOne(
      { quarterTitle: quarterActiveTask },
      { $pull: { tasks: { taskPosition: positionActiveTask } } },
      { session }
    );
    await Quarter.updateOne(
      { quarterTitle: quarterActiveTask },
      { $inc: { "tasks.$[elem].taskPosition": -1 } },
      { arrayFilters: [{ "elem.taskPosition": { $gt: positionActiveTask } }], session }
    );
    await Quarter.updateOne(
      { quarterTitle: targetQuarter },
      { $inc: { "tasks.$[elem].taskPosition": 1 } },
      { arrayFilters: [{ "elem.taskPosition": { $gte: calculatedPosition } }], session }
    );
    await Quarter.updateOne(
      { quarterTitle: targetQuarter },
      {
        $push: {
          tasks: {
            $each: [{ taskTitle: taskTitle, taskPosition: calculatedPosition }],
            $position: calculatedPosition,
          },
        },
      },
      { session }
    );
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
