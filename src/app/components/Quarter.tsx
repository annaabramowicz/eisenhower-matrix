import DropArea from "./DropArea";
import Task from "./Task";
import { QuarterTasksType } from "../types/matrixTypes";

const Quarter = ({ quarterTasks, onDrop }: QuarterTasksType) => {
  return (
    <div key={quarterTasks.title} className="dnd-group">
      <h2>{quarterTasks.title}</h2>
      <DropArea onDrop={() => onDrop(quarterTasks.title, 0)} />
      {quarterTasks.tasks.map((task, index) => {
        return (
          <Task
            key={task.id}
            index={index}
            quarterTitle={quarterTasks.title}
            onDrop={() => onDrop(quarterTasks.title, index + 1)}
          />
        );
      })}
    </div>
  );
};

export default Quarter;
