import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle, Task } from "../types/matrixTypes";

export const useUpdatedMatrixWithAddedTask = () => {
  const { setMatrix } = useMatrixContext();

  const addTaskToContext = (targetQuarterTitle: QuarterTitle, newTask: Task, targetTaskIndex: number) => {
    setMatrix((prevMatrix) => {
      return prevMatrix.map((quarter) => {
        if (quarter.quarterTitle !== targetQuarterTitle) return quarter;

        const updatedTasks = [...quarter.tasks];
        updatedTasks.splice(targetTaskIndex, 0, newTask);

        return { ...quarter, tasks: updatedTasks };
      });
    });
  };

  return { addTaskToContext };
};
