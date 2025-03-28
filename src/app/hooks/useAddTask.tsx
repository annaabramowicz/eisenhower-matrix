import { addTaskToDB } from "../actions/actions";
import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle, Task } from "../types/matrixTypes";

export const useAddTask = () => {
  const { matrix, setMatrix } = useMatrixContext();

  const addTask = async (quarterTitle: QuarterTitle, newTask: Task, positionTaskToMove?: number, addToDB?: boolean) => {
    const quarterToMove = matrix.find((quarter) => quarter.quarterTitle === quarterTitle);
    const calculatedPosition = positionTaskToMove ?? quarterToMove?.tasks.length ?? 0;

    setMatrix((prevMatrix) => {
      return prevMatrix.map((quarter) => {
        if (quarter.quarterTitle === quarterTitle) return quarter;
        const updatedTasks = quarter.tasks.map((task) => ({
          ...task,
          taskPosition: task.taskPosition >= calculatedPosition ? task.taskPosition + 1 : task.taskPosition,
        }));
        const updatedTask = { ...newTask, taskPosition: calculatedPosition };
        updatedTasks.splice(calculatedPosition, 0, updatedTask);
        return { ...quarter, tasks: updatedTasks };
      });
    });

    if (addToDB) await addTaskToDB(quarterTitle, newTask.taskTitle, calculatedPosition);
  };

  return { addTask };
};
