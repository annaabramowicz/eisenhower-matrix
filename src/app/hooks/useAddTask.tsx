import { addTaskToMatrixDB } from "../api/matrix/axiosMatrix";
import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle, Task } from "../types/matrixTypes";

export const useAddTask = () => {
  const { matrix, setMatrix } = useMatrixContext();

  const addTask = (quarterTitle: QuarterTitle, newTask: Task, positionTaskToMove?: number, addToDB?: boolean) => {
    const quarterToMove = matrix[quarterTitle];
    const calculatedPosition = positionTaskToMove ?? quarterToMove.tasks.length;

    setMatrix((prevMatrix) => {
      const newTasks = prevMatrix[quarterTitle].tasks.toSpliced(calculatedPosition, 0, newTask);
      return { ...prevMatrix, [quarterTitle]: { tasks: newTasks } };
    });
    if (addToDB) addTaskToMatrixDB(quarterTitle, newTask.title, calculatedPosition);
  };

  return { addTask };
};
