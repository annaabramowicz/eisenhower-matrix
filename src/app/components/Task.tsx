"use client";

import DropArea from "./DropArea";
import { useContext } from "react";
import { MatrixContext } from "./Matrix";

const Task = ({
  index,
  quarterTitle,
  onDrop,
}: {
  index: number;
  quarterTitle: string;
  onDrop: (quarterTitle?: string, position?: number) => void;
}) => {
  const { matrixTasks, setQuarterActiveTask, setPositionActiveTask } =
    useContext(MatrixContext);

  const matrixQuarter = matrixTasks.find(
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
