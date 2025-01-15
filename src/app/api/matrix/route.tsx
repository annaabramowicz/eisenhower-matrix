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

// // export async function GET() {
// //   return Response.json(users);
// // }
// export const dynamic = "force-static";

// export async function GET() {
//   const res = await fetch("http://localhost:3000/api", {
//     headers: {
//       "Content-Type": "application/json",
//       "API-Key": process.env.DATA_API_KEY,
//     },
//   });
//   const data = await res.json();

//   return Response.json({ data });
// }
