import { useMatrixContext } from "../context/matrixContext";
import { Quarter } from "../types/matrixTypes";

export const useAddTask = () => {
  const { matrix, setMatrix } = useMatrixContext();

  const addTask = (
    quarterTitle: string,
    newTask: { id: string },
    positionTaskToMove?: number
  ) => {
    const quarterToMove = matrix.find(({ title }) => title === quarterTitle);
    const calculatedPosition =
      positionTaskToMove ?? quarterToMove?.tasks.length ?? 0;

    setMatrix((prevMatrix) => {
      return prevMatrix.map((quarter: Quarter) => {
        if (quarter.title === quarterTitle) {
          const newTasks = [...quarter.tasks];
          newTasks.splice(calculatedPosition, 0, newTask);
          return { ...quarter, tasks: newTasks };
        }
        return quarter;
      });
    });
  };

  return { addTask };
};
