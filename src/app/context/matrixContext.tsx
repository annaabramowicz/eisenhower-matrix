"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { Matrix, MatrixContextType, QuarterTitle } from "../types/matrixTypes";

type MatrixContextProvider = {
  children: ReactNode;
};

const defaultMatrix: Matrix = {
  "DO FIRST": {
    tasks: [{ title: "Example task" }],
  },
  SCHEDULE: {
    tasks: [],
  },
  DELEGATE: {
    tasks: [],
  },
  DELETE: {
    tasks: [],
  },
} as const;

const MatrixContext = createContext<MatrixContextType | null>(null);

export const MatrixContextProvider = ({ children }: MatrixContextProvider) => {
  const [matrix, setMatrix] = useState(defaultMatrix);

  const [activeTask, setActiveTask] = useState<{
    positionActiveTask: null | number;
    quarterActiveTask: null | QuarterTitle;
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
  if (!context) throw new Error("useMatrixContext called outside of the matrix provider");
  return context;
};
