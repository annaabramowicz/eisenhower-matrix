import { useMatrixContext } from "../context/matrixContext";
import { Quarter } from "../types/matrixTypes";

export const useAddTask = () => {
  const { setMatrix } = useMatrixContext();

  const addTask = (
    quarterTitle: string,
    positionTaskToMove: number,
    newTask: { id: string }
  ) => {
    setMatrix((prevMatrix) => {
      return prevMatrix.map((quarter: Quarter) => {
        if (quarter.title === quarterTitle) {
          const newTasks = [...quarter.tasks];
          newTasks.splice(positionTaskToMove, 0, newTask);
          return { ...quarter, tasks: newTasks };
        }
        return quarter;
      });
    });
  };

  return { addTask };
};
