import { createContext, ReactNode, useState } from "react";
import { MatrixContextType } from "../types/matrixTypes";

type MatrixContextProvider = {
  children: ReactNode;
};

const defaultMatrix = [
  { title: "quarter 1", tasks: [{ id: "1" }, { id: "2" }, { id: "3" }] },
  { title: "quarter 2", tasks: [{ id: "4" }, { id: "5" }] },
  { title: "quarter 3", tasks: [{ id: "6" }] },
  { title: "quarter 4", tasks: [{ id: "7" }, { id: "8" }] },
];

export const MatrixContext = createContext<MatrixContextType>({
  matrix: defaultMatrix,
  setMatrix: () => {},
  positionActiveTask: null,
  setPositionActiveTask: () => {},
  quarterActiveTask: null,
  setQuarterActiveTask: () => {},
});

export const MatrixContextProvider = ({ children }: MatrixContextProvider) => {
  const [matrix, setMatrix] = useState(defaultMatrix);
  const [positionActiveTask, setPositionActiveTask] = useState<null | number>(
    null
  );
  const [quarterActiveTask, setQuarterActiveTask] = useState<null | string>(
    null
  );

  return (
    <MatrixContext.Provider
      value={{
        matrix,
        setMatrix,
        positionActiveTask,
        setPositionActiveTask,
        quarterActiveTask,
        setQuarterActiveTask,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};
