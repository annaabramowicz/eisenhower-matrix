import {
  addTaskToDB,
  decrementTaskPositionInDB,
  incrementTaskPositionInDB,
  removeTaskFromDB,
} from "../actions/actions";
import { useMatrixContext } from "../context/matrixContext";
import { calculatePosition } from "../helpers/calculatePositionMovedTask";
import { QuarterTitle } from "../types/matrixTypes";
import { useAddTask } from "./useAddTask";
import { useRemoveTask } from "./useRemoveTask";

export const useMatrix = () => {
  const { matrix, setMatrix, activeTask } = useMatrixContext();
  const { addTask } = useAddTask();
  const { removeTask } = useRemoveTask();
  const matrixRollback = JSON.parse(JSON.stringify(matrix));

  const getTaskByQuarterAndIndex = (quarterTitle: QuarterTitle, taskIndex: number) => {
    const quarter = matrix.find((quarter) => {
      return quarter.quarterTitle === quarterTitle;
    });
    return quarter?.tasks[taskIndex];
  };

  const moveTask = async (titleQuarterToMove: QuarterTitle, positionTaskToMove?: number) => {
    if (activeTask.quarterActiveTask === null || activeTask.positionActiveTask === null) return;
    const quarterToMove = matrix.find((quarter) => {
      return quarter.quarterTitle === titleQuarterToMove;
    });

    const calculatedPosition = calculatePosition(
      activeTask.quarterActiveTask,
      titleQuarterToMove,
      activeTask.positionActiveTask,
      positionTaskToMove,
      quarterToMove?.tasks.length === 0,
      matrix
    );

    const taskToMove = getTaskByQuarterAndIndex(activeTask.quarterActiveTask, activeTask.positionActiveTask);
    if (!taskToMove) return;

    removeTask(activeTask.quarterActiveTask, activeTask.positionActiveTask);
    addTask(titleQuarterToMove, taskToMove, calculatedPosition);

    try {
      await removeTaskFromDB(activeTask.positionActiveTask, activeTask.quarterActiveTask);
      await decrementTaskPositionInDB(activeTask.positionActiveTask, activeTask.quarterActiveTask);
      await incrementTaskPositionInDB(titleQuarterToMove, calculatedPosition);
      await addTaskToDB(titleQuarterToMove, taskToMove.taskTitle, calculatedPosition);
    } catch (error) {
      setMatrix(matrixRollback);
      console.error("can not add task to DB", error);
    }
  };
  return { moveTask };
};
