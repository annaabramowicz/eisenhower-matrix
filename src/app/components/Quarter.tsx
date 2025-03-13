import DropArea from "./DropArea";
import Task from "./Task";
import { useMatrix } from "../hooks/useMatrix";
import { QuarterTasks, QuarterTitle } from "../types/matrixTypes";

type QuarterTasksProps = {
  quarterTasks: QuarterTasks;
  quarterTitle: QuarterTitle;
};

const Quarter = ({ quarterTasks, quarterTitle }: QuarterTasksProps) => {
  const { moveTask } = useMatrix();
  return (
    <div className="flex flex-col bg-base-300 rounded-md text-center mx-auto w-full max-h-full p-4">
      <h2 className="mb-0">{quarterTitle}</h2>
      {quarterTasks.tasks.map((_, positionTaskToMove) => {
        return <Task key={positionTaskToMove} positionTaskToMove={positionTaskToMove} quarterTitle={quarterTitle} />;
      })}
      <DropArea styleLastElement={"grow"} onDrop={() => moveTask(quarterTitle)} />
    </div>
  );
};

export default Quarter;
