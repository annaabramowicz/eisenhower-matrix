"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { MatrixContextType, QuarterTitle } from "../types/matrixTypes";
import { initialMatrix } from "./initialMatrix";

type MatrixContextProvider = {
  children: ReactNode;
};

const MatrixContext = createContext<MatrixContextType | null>(null);

export const MatrixContextProvider = ({ children }: MatrixContextProvider) => {
  const [matrix, setMatrix] = useState(initialMatrix);

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
