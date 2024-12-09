import DropArea from "./DropArea";
import Task from "./Task";
import { QuarterTasksType } from "../types/matrixTypes";
import { useMatrix } from "../hooks/useMatrix";

const Quarter = ({ quarterTasks }: QuarterTasksType) => {
  const { moveTask } = useMatrix();
  return (
    <div
      key={quarterTasks.title}
      className="bg-base-300  rounded-md prose text-center"
    >
      <h2 className="mt-5 mb-0">{quarterTasks.title}</h2>
      <DropArea onDrop={() => moveTask(quarterTasks.title, 0)} />
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
