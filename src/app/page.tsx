// import { z } from "zod";
import MatrixGrid from "./components/MatrixGrid";
import { initialMatrix } from "./context/initialMatrix";
import { MatrixContextProvider } from "./context/matrixContext";
import { mapperTaskApiData } from "./helpers/mapperTaskApiData";
import connectDB from "./lib/connectDB";
import Task from "./model/task";

// const MatrixSchema = z.array(
//   z.object({
//     quarterActiveTask: z.string(),
//     title: z.string(),
//   })
// );
export default async function Home() {
  await connectDB();
  const data = await Task.find({});
  // MatrixSchema.parse(data);
  const newMatrix = mapperTaskApiData(data, initialMatrix);

  return (
    <div className="flex justify-center h-screen">
      <MatrixContextProvider>
        <MatrixGrid newMatrix={newMatrix} />
      </MatrixContextProvider>
    </div>
  );
}
