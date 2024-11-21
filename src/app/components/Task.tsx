import { useContext } from "react";
import { MatrixContext } from "./Matrix";
import { TaskType } from "../types/matrixTypes";
import DropArea from "./DropArea";

const Task = ({ index, quarterTitle, onDrop }: TaskType) => {
  const { quarterTasks, setQuarterActiveTask, setPositionActiveTask } =
    useContext(MatrixContext);

  const matrixQuarter = quarterTasks.find(
    (quarter) => quarter.title === quarterTitle
  );
  const renderedTask = matrixQuarter?.tasks[index];
  return (
    <>
      <div
        draggable
        onDragStart={() => {
          setPositionActiveTask(index);
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
