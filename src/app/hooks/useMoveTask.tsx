import { moveTaskInDB } from "../actions/actions";
import { useMatrixContext } from "../context/matrixContext";
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

  const moveTask = async (titleQuarterToMove: QuarterTitle, dropIndex: number) => {
    if (activeTask.quarterActiveTask === null || activeTask.positionActiveTask === null) return;

    const taskToMove = getTaskByQuarterAndIndex(activeTask.quarterActiveTask, activeTask.positionActiveTask);
    if (!taskToMove) return;

    removeTaskFromContext(activeTask.quarterActiveTask, taskToMove._id);
    addTaskToContext(titleQuarterToMove, taskToMove, dropIndex);

    try {
      await moveTaskInDB(titleQuarterToMove, taskToMove, dropIndex, activeTask.quarterActiveTask);
    } catch (error) {
      setMatrix(matrixRollback);
      console.error("can not add task to DB", error);
    }
  };
  return { moveTask };
};
