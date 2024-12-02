import { useContext } from "react";
import { MatrixContext } from "../context/matrixContext";
import { Quarter } from "../types/matrixTypes";

export const useAddTask = () => {
  const { matrix, setMatrix } = useContext(MatrixContext);

  const addTask = (
    quarterTitle: string,
    positionTaskToMove: number,
    newTask: { id: string }
  ) => {
    const updatedMatrix = matrix.map((quarter: Quarter) => {
      if (quarter.title === quarterTitle) {
        const newTasks = [...quarter.tasks];
        newTasks.splice(positionTaskToMove, 0, newTask);
        return { ...quarter, tasks: newTasks };
      }
      return quarter;
    });
    setMatrix(updatedMatrix);
  };

  return { addTask };
};
