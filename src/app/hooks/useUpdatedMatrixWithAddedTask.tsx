import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle, Task } from "../types/matrixTypes";

export const useUpdatedMatrixWithAddedTask = () => {
  const { setMatrix } = useMatrixContext();

  const addTaskToContext = (quarterTitle: QuarterTitle, newTask: Task, calculatedPosition: number) => {
    setMatrix((prevMatrix) => {
      return prevMatrix.map((quarter) => {
        if (quarter.quarterTitle !== quarterTitle) return quarter;
        const updatedTasks = quarter.tasks.map((task) => ({
          ...task,
          taskPosition: task.taskPosition >= calculatedPosition ? task.taskPosition + 1 : task.taskPosition,
        }));

        const updatedTask = { ...newTask, taskPosition: calculatedPosition };
        updatedTasks.splice(calculatedPosition, 0, updatedTask);

        return { ...quarter, tasks: updatedTasks };
      });
    });
  };

  return { addTaskToContext };
};
