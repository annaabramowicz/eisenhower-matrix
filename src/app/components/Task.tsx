import { TaskType } from "../types/matrixTypes";
import DropArea from "./DropArea";
import { useMatrixContext } from "../context/matrixContext";
import { useMoveTask } from "../hooks/useMoveTask";
import { useRemoveTask } from "../hooks/useRemoveTask";

const Task = ({ quarterTitle, task, dropIndex }: TaskType) => {
  const { setActiveTask } = useMatrixContext();
  const { moveTask } = useMoveTask();
  const { removeTask } = useRemoveTask();

  return (
    <>
      <DropArea onDrop={() => moveTask(quarterTitle, dropIndex)} />
      <div
        draggable
        onDragStart={() => {
          setActiveTask({
            positionActiveTask: dropIndex,
            quarterActiveTask: quarterTitle,
          });
        }}
        className="px-3 py-0 alert rounded-md justify-items-end"
      >
        <p className="px-2">{task.taskTitle}</p>

        <button className="btn btn-circle" onClick={() => removeTask(quarterTitle, task._id)}>
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
