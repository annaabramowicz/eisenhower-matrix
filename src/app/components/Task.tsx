import { TaskType } from "../types/matrixTypes";
import DropArea from "./DropArea";
import { useMatrixContext } from "../context/matrixContext";
import { useMatrix } from "../hooks/useMatrix";
import { useRemoveTask } from "../hooks/useRemoveTask";

const Task = ({ positionTaskToMove, quarterTitle }: TaskType) => {
  const { matrix, setActiveTask } = useMatrixContext();
  const { moveTask } = useMatrix();
  const { removeTask } = useRemoveTask();

  const matrixQuarter = matrix.find((quarter) => {
    return quarter.quarterTitle === quarterTitle;
  });
  const renderedTask = matrixQuarter?.tasks[positionTaskToMove];

  return (
    <>
      <DropArea onDrop={() => moveTask(quarterTitle, positionTaskToMove)} />
      <div
        draggable
        onDragStart={() => {
          setActiveTask({
            positionActiveTask: positionTaskToMove,
            quarterActiveTask: quarterTitle,
          });
        }}
        className="px-3 py-0 alert rounded-md justify-items-end"
      >
        <p className="px-2">{renderedTask?.taskTitle}</p>

        <button className="btn btn-circle" onClick={() => removeTask(quarterTitle, positionTaskToMove, true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  );
};
export default Task;
