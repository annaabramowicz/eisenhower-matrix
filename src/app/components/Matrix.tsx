"use client";

import Quarter from "./Quarter";
import { createContext, useState } from "react";
import { MatrixContextType } from "../types/matrixTypes";
import { useEisenhowerMatrix } from "../hooks/useEisenhowerMatrix";

export const MatrixContext = createContext<MatrixContextType>({
  quarterTasks: defaultMatrix,
  positionActiveTask: null,
  setPositionActiveTask: () => {},
  quarterActiveTask: null,
  setQuarterActiveTask: () => {},
});

const Matrix = () => {
  const { quarterTasks, addTask, removeTask } = useEisenhowerMatrix();

  const [positionActiveTask, setPositionActiveTask] = useState<null | number>(
    null
  );
  const [quarterActiveTask, setQuarterActiveTask] = useState<null | string>(
    null
  );

  const getTaskByQuarterAndIndex = (
    quarterTitle: string,
    taskIndex: number
  ) => {
    const quarter = quarterTasks.find(({ title }) => title === quarterTitle);
    return quarter?.tasks[taskIndex];
  };

  const onDrop = (titleQuarterToMove: string, positionTaskToMove: number) => {
    if (quarterActiveTask === null || positionActiveTask === null) return;
    const taskToMove = getTaskByQuarterAndIndex(
      quarterActiveTask,
      positionActiveTask
    );
    if (!taskToMove) return;

    removeTask(quarterActiveTask, positionActiveTask);
    addTask(titleQuarterToMove, positionTaskToMove, taskToMove);
  };
  return (
    <MatrixContext.Provider
      value={{
        quarterTasks,
        positionActiveTask,
        setPositionActiveTask,
        quarterActiveTask,
        setQuarterActiveTask,
      }}
    >
      <div className="drag-and-drop">
        {quarterTasks.map((quarterTasks) => (
          <Quarter
            key={quarterTasks.title}
            quarterTasks={quarterTasks}
            onDrop={onDrop}
          />
        ))}
      </div>
    </MatrixContext.Provider>
  );
};

export default Matrix;
