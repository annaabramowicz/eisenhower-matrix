"use client";

import Quarter from "./Quarter";
import { MatrixContext, MatrixContextProvider } from "../context/matrixContext";
import { useAddTask } from "../hooks/useAddTask";
import { useContext } from "react";

const Matrix = () => {
  const { matrix, positionActiveTask, quarterActiveTask } =
    useContext(MatrixContext);
  const { addTask } = useAddTask();

  const getTaskByQuarterAndIndex = (
    quarterTitle: string,
    taskIndex: number
  ) => {
    const quarter = matrix.find(({ title }) => title === quarterTitle);
    return quarter?.tasks[taskIndex];
  };

  const onDrop = (titleQuarterToMove: string, positionTaskToMove: number) => {
    if (quarterActiveTask === null || positionActiveTask === null) return;
    const taskToMove = getTaskByQuarterAndIndex(
      quarterActiveTask,
      positionActiveTask
    );
    if (!taskToMove) return;

    // removeTask(quarterActiveTask, positionActiveTask);
    addTask(titleQuarterToMove, positionTaskToMove, taskToMove);
  };
  return (
    <MatrixContextProvider>
      <div className="drag-and-drop">
        {matrix.map((quarterTasks) => (
          <Quarter
            key={quarterTasks.title}
            quarterTasks={quarterTasks}
            onDrop={onDrop}
          />
        ))}
      </div>
    </MatrixContextProvider>
  );
};

export default Matrix;
