import { useMatrixContext } from "../context/matrixContext";
import Quarter from "./Quarter";

const Matrix = () => {
  const { matrix } = useMatrixContext();

  return (
    <div className="grid grid-cols-2 grid-rows-2 h-full w-full m-auto gap-2">
      {matrix.map((quarter) => {
        return <Quarter key={quarter.quarterTitle} quarter={quarter} />;
      })}
    </div>
  );
};

export default Matrix;
