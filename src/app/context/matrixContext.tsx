import { createContext, ReactNode, useContext, useState } from "react";
import { MatrixContextType } from "../types/matrixTypes";
import { QuarterTitle } from "../types/enums";
import { getNewId } from "../helpers/idGenerator";

type MatrixContextProvider = {
  children: ReactNode;
};

const defaultMatrix = [
  {
    title: QuarterTitle.doFirst,
    tasks: [{ id: getNewId(), task: "1" }],
  },
  { title: QuarterTitle.schedule, tasks: [] },
  { title: QuarterTitle.delegate, tasks: [] },
  { title: QuarterTitle.delete, tasks: [] },
];

const MatrixContext = createContext<MatrixContextType | null>(null);

export const MatrixContextProvider = ({ children }: MatrixContextProvider) => {
  const [matrix, setMatrix] = useState(defaultMatrix);

  const [activeTask, setActiveTask] = useState<{
    positionActiveTask: null | number;
    quarterActiveTask: null | string;
  }>({
    positionActiveTask: null,
    quarterActiveTask: null,
  });

  return (
    <MatrixContext.Provider
      value={{
        matrix,
        activeTask,
        setMatrix,
        setActiveTask,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};

export const useMatrixContext = () => {
  const context = useContext(MatrixContext);
  if (!context)
    throw new Error("useMatrixContext called outside of the matrix provider");
  return context;
};
