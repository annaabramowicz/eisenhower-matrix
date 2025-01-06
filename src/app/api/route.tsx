import { NextResponse } from "next/server";
import connectDB from "../lib/connectDB";
import Task from "../model/task";

export async function POST() {
  try {
    await connectDB();

    const newTask = await Task.create({
      id: "01",
      title: "przykladowy tytul",
    });
    return NextResponse.json({ task: newTask, message: "task created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
}
