import { useMatrixContext } from "../context/matrixContext";
import { useAddTask } from "./useAddTask";
import { useRemoveTask } from "./useRemoveTask";

export const useMatrix = () => {
  const { matrix, activeTask } = useMatrixContext();
  const { addTask } = useAddTask();
  const { removeTask } = useRemoveTask();

  const getTaskByQuarterAndIndex = (
    quarterTitle: string,
    taskIndex: number
  ) => {
    const quarter = matrix.find(({ title }) => title === quarterTitle);
    return quarter?.tasks[taskIndex];
  };

  const onDrop = (titleQuarterToMove: string, positionTaskToMove: number) => {
    if (
      activeTask.quarterActiveTask === null ||
      activeTask.positionActiveTask === null
    )
      return;
    const taskToMove = getTaskByQuarterAndIndex(
      activeTask.quarterActiveTask,
      activeTask.positionActiveTask
    );
    if (!taskToMove) return;

    removeTask(activeTask.quarterActiveTask, activeTask.positionActiveTask);
    addTask(titleQuarterToMove, positionTaskToMove, taskToMove);
  };
  return { onDrop };
};
