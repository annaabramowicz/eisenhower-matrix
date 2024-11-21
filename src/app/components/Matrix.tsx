"use client";

import { createContext, useState } from "react";
import Quarter from "./Quarter";
import { useRemoveTask } from "../hooks/useRemoveTask";
import { useAddTask } from "../hooks/useAddTask";

type MatrixContextType = {
  matrixTasks: { title: string; tasks: { id: string }[] }[];
  positionActiveTask: null | number;
  setPositionActiveTask: (index: number | null) => void;
  quarterActiveTask: null | string;
  setQuarterActiveTask: (quarter: string | null) => void;
};

const defaultMatrix = [
  { title: "quarter 1", tasks: [{ id: "1" }, { id: "2" }, { id: "3" }] },
  { title: "quarter 2", tasks: [{ id: "4" }, { id: "5" }] },
  { title: "quarter 3", tasks: [{ id: "6" }] },
  { title: "quarter 4", tasks: [{ id: "7" }, { id: "8" }] },
];

export const MatrixContext = createContext<MatrixContextType>({
  matrixTasks: defaultMatrix,
  positionActiveTask: null,
  setPositionActiveTask: () => {},
  quarterActiveTask: null,
  setQuarterActiveTask: () => {},
});

const Matrix = () => {
  const [matrixTasks, setMatrixTasks] = useState(defaultMatrix);
  const [positionActiveTask, setPositionActiveTask] = useState<null | number>(
    null
  );
  const [quarterActiveTask, setQuarterActiveTask] = useState<null | string>(
    null
  );
  const removeTask = useRemoveTask(setMatrixTasks);
  const addTask = useAddTask(setMatrixTasks);

  const getTaskByQuarterAndIndex = (
    quarterTitle: string,
    taskIndex: number
  ) => {
    const quarter = matrixTasks.find(({ title }) => title === quarterTitle);
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
        matrixTasks,
        positionActiveTask,
        setPositionActiveTask,
        quarterActiveTask,
        setQuarterActiveTask,
      }}
    >
      <div className="drag-and-drop">
        {matrixTasks.map((quarterTasks) => (
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
