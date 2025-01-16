import { moveTaskInMatrixDB } from "../api/matrix/axiosMatrix";
import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle } from "../types/matrixTypes";
import { useAddTask } from "./useAddTask";
import { useRemoveTask } from "./useRemoveTask";

export const useMatrix = () => {
  const { matrix, activeTask } = useMatrixContext();
  const { addTask } = useAddTask();
  const { removeTask } = useRemoveTask();

  const getTaskByQuarterAndIndex = (quarterTitle: QuarterTitle, taskIndex: number) => {
    const quarter = matrix[quarterTitle];
    return quarter?.tasks[taskIndex];
  };

  const moveTask = (titleQuarterToMove: QuarterTitle, positionTaskToMove?: number) => {
    if (activeTask.quarterActiveTask === null || activeTask.positionActiveTask === null) return;
    const taskToMove = getTaskByQuarterAndIndex(activeTask.quarterActiveTask, activeTask.positionActiveTask);
    if (!taskToMove) return;

    removeTask(activeTask.quarterActiveTask, activeTask.positionActiveTask);
    addTask(titleQuarterToMove, taskToMove, positionTaskToMove);
    moveTaskInMatrixDB(
      activeTask.quarterActiveTask,
      activeTask.positionActiveTask,
      titleQuarterToMove,
      positionTaskToMove!
    );
  };
  return { moveTask };
};
