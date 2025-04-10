import { moveTaskInDB } from "../actions/actions";
import { useMatrixContext } from "../context/matrixContext";
import { calculatePosition } from "../helpers/calculatePositionMovedTask";
import { useUpdatedMatrixWithAddedTask } from "./useUpdatedMatrixWithAddedTask";
import { QuarterTitle } from "../types/matrixTypes";
import { useUpdatedMatrixWithRemovedTask } from "./useUpdatedMatrixWithRemovedTask";
import _ from "lodash";

export const useMoveTask = () => {
  const { matrix, setMatrix, activeTask } = useMatrixContext();
  const { addTaskToContext } = useUpdatedMatrixWithAddedTask();
  const { removeTaskFromContext } = useUpdatedMatrixWithRemovedTask();

  const matrixRollback = _.cloneDeep(matrix);

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

    removeTaskFromContext(activeTask.quarterActiveTask, activeTask.positionActiveTask);
    addTaskToContext(titleQuarterToMove, taskToMove, calculatedPosition);

    try {
      await moveTaskInDB(
        activeTask.positionActiveTask,
        titleQuarterToMove,
        taskToMove.taskTitle,
        calculatedPosition,
        activeTask.quarterActiveTask
      );
    } catch (error) {
      setMatrix(matrixRollback);
      console.error("can not add task to DB", error);
    }
  };
  return { moveTask };
};
