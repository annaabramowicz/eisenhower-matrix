import DropArea from "./DropArea";
import Task from "./Task";
import { QuarterTasksType } from "../types/matrixTypes";
import { useMatrix } from "../hooks/useMatrix";

const Quarter = ({ quarterTasks }: QuarterTasksType) => {
  const { moveTask } = useMatrix();
  return (
    <div
      key={quarterTasks.title}
      className="flex flex-col bg-base-300 rounded-md text-center mx-auto w-full max-h-full p-4"
    >
      <h2 className="mb-0">{quarterTasks.title}</h2>
      {quarterTasks.tasks.map((task, positionTaskToMove) => {
        return (
          <Task
            key={task.id}
            positionTaskToMove={positionTaskToMove}
            quarterTitle={quarterTasks.title}
          />
        );
      })}
      <DropArea
        styleLastElement={"grow"}
        onDrop={() => moveTask(quarterTasks.title)}
      />
    </div>
  );
};

export default Quarter;
