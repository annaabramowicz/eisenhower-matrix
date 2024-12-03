import { useMatrixContext } from "../context/matrixContext";
import { useAddTask } from "./useAddTask";

export const useMatrix = () => {
  const { matrix, positionActiveTask, quarterActiveTask } = useMatrixContext();
  const { addTask } = useAddTask();

  const getTaskByQuarterAndIndex = (
    quarterTitle: string,
    taskIndex: number
  ) => {
    const quarter = matrix.find(({ title }) => title === quarterTitle);
    return quarter?.tasks[taskIndex];
  };

  const onDrop = (titleQuarterToMove: string, positionTaskToMove: number) => {
    if (quarterActiveTask === null || positionActiveTask === null) return;
    const taskToMove = getTaskByQuarterAndIndex(
      quarterActiveTask,
      positionActiveTask
    );
    if (!taskToMove) return;

    // removeTask(quarterActiveTask, positionActiveTask);
    addTask(titleQuarterToMove, positionTaskToMove, taskToMove);
  };
  return { onDrop };
};
