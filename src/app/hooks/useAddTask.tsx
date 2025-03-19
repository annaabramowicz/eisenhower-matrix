import { addTaskToDB } from "../actions/actions";
import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle, Task } from "../types/matrixTypes";

export const useAddTask = () => {
  const { matrix, setMatrix } = useMatrixContext();

  const addTask = async (quarterTitle: QuarterTitle, newTask: Task, positionTaskToMove?: number, addToDB?: boolean) => {
    const quarterToMove = matrix[quarterTitle];
    const calculatedPosition = positionTaskToMove ?? quarterToMove.tasks.length;

    setMatrix((prevMatrix) => {
      const newTasks = prevMatrix[quarterTitle].tasks.toSpliced(calculatedPosition, 0, newTask);
      return { ...prevMatrix, [quarterTitle]: { tasks: newTasks } };
    });

    if (addToDB) await addTaskToDB(quarterTitle, newTask.title, calculatedPosition);
  };

  return { addTask };
};
