import { z } from "zod";
import MatrixGrid from "./components/MatrixGrid";
import { initialMatrix } from "./context/initialMatrix";
import { MatrixContextProvider } from "./context/matrixContext";
import { mapperTaskApiData } from "./helpers/mapperTaskApiData";
import connectDB from "./lib/connectDB";
import Task from "./model/quarter";
import Quarter from "./model/quarter";

const MatrixSchema = z.array(
  z.object({
    quarterActiveTask: z.string(),
    title: z.string(),
  })
);
export default async function Home() {
  await connectDB();
  const matrix = await Quarter.find({});
  console.log("🚀 ~ Home ~ data:", matrix);
  // console.log(data);

  // MatrixSchema.parse(matrix);
  // const newMatrix = mapperTaskApiData(data, initialMatrix);

  return (
    <div className="flex justify-center h-screen">
      <MatrixContextProvider>
        <MatrixGrid matrix={matrix} />
      </MatrixContextProvider>
    </div>
  );
}
