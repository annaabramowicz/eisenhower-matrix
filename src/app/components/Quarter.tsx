import DropArea from "./DropArea";
import Task from "./Task";
import { useMoveTask } from "../hooks/useMoveTask";
import { QuarterTitle, Task as TaskType } from "../types/matrixTypes";

type QuarterTasksProps = {
  quarterTasks: TaskType[];
  quarterTitle: QuarterTitle;
};

const Quarter = ({ quarterTasks, quarterTitle }: QuarterTasksProps) => {
  const { moveTask } = useMoveTask();
  return (
    <div className="flex flex-col bg-base-300 rounded-md text-center mx-auto w-full max-h-full p-4">
      <h2 className="mb-0">{quarterTitle}</h2>
      {quarterTasks.map((task, index) => {
        return <Task key={index} positionTaskToMove={task.taskPosition} quarterTitle={quarterTitle} />;
      })}
      <DropArea styleLastElement={"grow"} onDrop={() => moveTask(quarterTitle)} />
    </div>
  );
};

export default Quarter;
