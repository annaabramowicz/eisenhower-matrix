import { createContext, ReactNode, useContext, useState } from "react";
import { MatrixContextType } from "../types/matrixTypes";

type MatrixContextProvider = {
  children: ReactNode;
};

const defaultMatrix = [
  { title: "DO FIRST", tasks: [{ id: "1" }, { id: "2" }, { id: "3" }] },
  { title: "SCHEDULE", tasks: [{ id: "4" }, { id: "5" }] },
  { title: "DELEGATE", tasks: [{ id: "6" }] },
  { title: "DELETE", tasks: [{ id: "7" }, { id: "8" }] },
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
