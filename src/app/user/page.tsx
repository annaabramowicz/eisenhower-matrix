import connectDB from "../lib/connectDB";
import Task from "../model/task";

export default async function Page() {
  const db = await connectDB();
  const data = await Task.find({});
  console.log(data);
  // .select().from(tasks)

  //   const posts = await data.json();
  //   console.log(posts);
  return <div>fetch data</div>;
}
