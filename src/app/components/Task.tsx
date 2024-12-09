import { TaskType } from "../types/matrixTypes";
import DropArea from "./DropArea";
import { useMatrixContext } from "../context/matrixContext";
import { useMatrix } from "../hooks/useMatrix";
import { useRemoveTask } from "../hooks/useRemoveTask";

const Task = ({ positionTaskToMove, quarterTitle }: TaskType) => {
  const { matrix, setActiveTask } = useMatrixContext();
  const { moveTask } = useMatrix();
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
        className="p-4 alert"
      >
        <p>{renderedTask?.id}</p>
        <button
          className="btn "
          onClick={() => removeTask(quarterTitle, positionTaskToMove)}
        >
          delete
        </button>
      </div>
      <DropArea onDrop={() => moveTask(quarterTitle, positionTaskToMove + 1)} />
    </>
  );
};
export default Task;
