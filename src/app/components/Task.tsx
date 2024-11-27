import { useContext } from "react";
import { TaskType } from "../types/matrixTypes";
import DropArea from "./DropArea";
import { MatrixContext } from "../context/matrixContext";

const Task = ({ positionTaskToMove, quarterTitle, onDrop }: TaskType) => {
  const { matrix, setQuarterActiveTask, setPositionActiveTask } =
    useContext(MatrixContext);

  const matrixQuarter = matrix.find(
    (quarter) => quarter.title === quarterTitle
  );
  const renderedTask = matrixQuarter?.tasks[positionTaskToMove];
  return (
    <>
      <div
        draggable
        onDragStart={() => {
          setPositionActiveTask(positionTaskToMove);
          setQuarterActiveTask(quarterTitle);
        }}
        className="dnd-task"
      >
        <p>{renderedTask?.id}</p>
      </div>
      <DropArea onDrop={() => onDrop()} />
    </>
  );
};
export default Task;
