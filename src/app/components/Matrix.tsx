import Quarter from "./Quarter";
import { useMatrixContext } from "../context/matrixContext";

const Matrix = () => {
  const { matrix } = useMatrixContext();

  return (
    <div className="grid grid-cols-2 grid-rows-2 h-full w-full m-auto gap-2">
      {matrix.map((quarterTasks) => (
        <Quarter key={quarterTasks.title} quarterTasks={quarterTasks} />
      ))}
    </div>
  );
};

export default Matrix;
