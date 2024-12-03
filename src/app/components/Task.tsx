import { TaskType } from "../types/matrixTypes";
import DropArea from "./DropArea";
import { useMatrixContext } from "../context/matrixContext";
import { useMatrix } from "../hooks/useMatrix";
import { useRemoveTask } from "../hooks/useRemoveTask";

const Task = ({ positionTaskToMove, quarterTitle }: TaskType) => {
  const { matrix, setActiveTask } = useMatrixContext();
  const { onDrop } = useMatrix();
  const { removeTask } = useRemoveTask();

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
        <button onClick={() => removeTask(quarterTitle, positionTaskToMove)}>
          delete
        </button>
      </div>
      <DropArea onDrop={() => onDrop(quarterTitle, positionTaskToMove + 1)} />
    </>
  );
};
export default Task;
