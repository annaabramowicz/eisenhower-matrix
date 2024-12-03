import { TaskType } from "../types/matrixTypes";
import DropArea from "./DropArea";
import { useMatrixContext } from "../context/matrixContext";

const Task = ({ positionTaskToMove, quarterTitle, onDrop }: TaskType) => {
  const { matrix, setActiveTask } = useMatrixContext();

  const matrixQuarter = matrix.find(
    (quarter) => quarter.title === quarterTitle
  );
  const renderedTask = matrixQuarter?.tasks[positionTaskToMove];
  return (
    <>
      <div
        draggable
        onDragStart={() => {
          setActiveTask({
            positionActiveTask: positionTaskToMove,
            quarterActiveTask: quarterTitle,
          });
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
