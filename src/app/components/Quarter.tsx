import DropArea from "./DropArea";
import Task from "./Task";
import { QuarterTasksType } from "../types/matrixTypes";
import { useMatrix } from "../hooks/useMatrix";

const Quarter = ({ quarterTasks }: QuarterTasksType) => {
  const { onDrop } = useMatrix();
  return (
    <div
      key={quarterTasks.title}
      className="border-solid border-2 border-black"
    >
      <h2>{quarterTasks.title}</h2>
      <DropArea onDrop={() => onDrop(quarterTasks.title, 0)} />
      {quarterTasks.tasks.map((task, positionTaskToMove) => {
        return (
          <Task
            key={task.id}
            positionTaskToMove={positionTaskToMove}
            quarterTitle={quarterTasks.title}
          />
        );
      })}
    </div>
  );
};

export default Quarter;
