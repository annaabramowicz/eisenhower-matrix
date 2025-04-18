import DropArea from "./DropArea";
import Task from "./Task";
import { useMoveTask } from "../hooks/useMoveTask";
import { Quarter as QuarterProps } from "../types/matrixTypes";

const Quarter = ({ quarter }: { quarter: QuarterProps }) => {
  const { moveTask } = useMoveTask();
  const { quarterTitle, tasks } = quarter;
  return (
    <div className="flex flex-col bg-base-300 rounded-md text-center mx-auto w-full max-h-full p-4">
      <h2 className="mb-0">{quarterTitle}</h2>
      {tasks.map((task, index) => {
        return <Task key={index} quarterTitle={quarterTitle} task={task} dropIndex={index} />;
      })}
      <DropArea styleLastElement={"grow"} onDrop={() => moveTask(quarterTitle, tasks.length)} />
    </div>
  );
};

export default Quarter;
