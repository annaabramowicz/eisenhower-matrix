import { addTaskToDB } from "../actions/actions";
import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle, Task } from "../types/matrixTypes";

export const useAddTask = () => {
  const { matrix, setMatrix } = useMatrixContext();

  const addTask = async (quarterTitle: QuarterTitle, newTask: Task, positionTaskToMove?: number, addToDB?: boolean) => {
    const quarterToMove = matrix.find((quarter) => {
      return quarter.quarterTitle === quarterTitle;
    });
    const calculatedPosition = positionTaskToMove ?? quarterToMove?.tasks.length;

    setMatrix((prevMatrix) => {
      const updatedTask = { ...newTask, taskPosition: calculatedPosition };
      const prev = prevMatrix.map((quarter) =>
        quarter.quarterTitle === quarterTitle
          ? { ...quarter, tasks: quarter.tasks.toSpliced(calculatedPosition, 0, updatedTask) }
          : quarter
      );
      return prev;
    });

    if (addToDB) await addTaskToDB(quarterTitle, newTask.taskTitle, calculatedPosition);
  };

  return { addTask };
};
