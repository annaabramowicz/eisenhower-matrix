import Quarter from "./Quarter";
import { useMatrixContext } from "../context/matrixContext";

const Matrix = () => {
  const { matrix } = useMatrixContext();

  return (
    <div className="drag-and-drop">
      {matrix.map((quarterTasks) => (
        <Quarter key={quarterTasks.title} quarterTasks={quarterTasks} />
      ))}
    </div>
  );
};

export default Matrix;
