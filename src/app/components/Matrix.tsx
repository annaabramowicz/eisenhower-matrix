import Quarter from "./Quarter";
import { useMatrixContext } from "../context/matrixContext";

const Matrix = () => {
  const { matrix } = useMatrixContext();

  return (
    <div className="grid grid-cols-2 grid-rows-2 h-full w-full m-auto gap-2">
      {Object.entries(matrix).map(([quarterTitle, quarterData]) => (
        <Quarter key={quarterTitle} quarterTasks={quarterData} quarterTitle={quarterTitle} />
      ))}
    </div>
  );
};

export default Matrix;
