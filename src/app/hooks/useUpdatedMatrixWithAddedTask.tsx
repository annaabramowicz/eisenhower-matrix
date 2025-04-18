import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle, Task } from "../types/matrixTypes";

export const useUpdatedMatrixWithAddedTask = () => {
  const { setMatrix } = useMatrixContext();

  const addTaskToContext = (quarterTitle: QuarterTitle, newTask: Task, taskIndex: number) => {
    setMatrix((prevMatrix) => {
      return prevMatrix.map((quarter) => {
        if (quarter.quarterTitle !== quarterTitle) return quarter;

        const updatedTasks = [...quarter.tasks];
        updatedTasks.splice(taskIndex, 0, newTask);

        return { ...quarter, tasks: updatedTasks };
      });
    });
  };

  return { addTaskToContext };
};
