import { TaskType } from "../types/matrixTypes";
import DropArea from "./DropArea";
import { useMatrixContext } from "../context/matrixContext";
import { useMatrix } from "../hooks/useMatrix";

const Task = ({ positionTaskToMove, quarterTitle }: TaskType) => {
  const { matrix, setActiveTask } = useMatrixContext();
  const { onDrop } = useMatrix();

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
      <DropArea onDrop={() => onDrop(quarterTitle, positionTaskToMove + 1)} />
    </>
  );
};
export default Task;
