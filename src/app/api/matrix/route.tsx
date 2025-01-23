import { NextResponse } from "next/server";
import connectDB from "../../lib/connectDB";
import Task from "../../model/task";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { title, positionActiveTask, quarterActiveTask } = await request.json();

    const newTask = await Task.create({
      title,
      positionActiveTask,
      quarterActiveTask,
    });
    return NextResponse.json({ task: newTask, message: "task created" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Internal server error", error: String(error) }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { positionActiveTask, quarterActiveTask } = await request.json();

    const result = await Task.deleteOne({ positionActiveTask, quarterActiveTask });
    if (result.deletedCount === 0) {
      return NextResponse.json({ result, message: "No task found to delete" }, { status: 404 });
    }
    return NextResponse.json({ result, message: "Task deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Internal server error", error: String(error) }, { status: 500 });
    }
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB();
    const { quarterActiveTask, positionActiveTask, quarterTitle, calculatedPosition } = await request.json();

    const updateManyInActiveQuarterResult = await Task.updateMany(
      { quarterActiveTask, positionActiveTask: { $gt: positionActiveTask } },
      { $inc: { positionActiveTask: -1 } }
    );

    const updateManyInQuarterToMoveResult = await Task.updateMany(
      { quarterActiveTask: quarterTitle, positionActiveTask: { $gte: calculatedPosition } },
      { $inc: { positionActiveTask: 1 } }
    );

    const updateOneResult = await Task.updateOne(
      { quarterActiveTask, positionActiveTask },
      { $set: { quarterActiveTask: quarterTitle, positionActiveTask: calculatedPosition } }
    );

    return NextResponse.json(
      {
        updateManyInActiveQuarterResult,
        updateManyInQuarterToMoveResult,
        updateOneResult,
        message: "Task updated successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Internal server error", error: String(error) }, { status: 500 });
    }
  }
}
