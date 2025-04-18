import { moveTaskInDB } from "../actions/actions";
import { useMatrixContext } from "../context/matrixContext";
import { useUpdatedMatrixWithAddedTask } from "./useUpdatedMatrixWithAddedTask";
import { QuarterTitle } from "../types/matrixTypes";
import { useUpdatedMatrixWithRemovedTask } from "./useUpdatedMatrixWithRemovedTask";
import _ from "lodash";

export const useMoveTask = () => {
  const { matrix, setMatrix, grabTask } = useMatrixContext();
  const { addTaskToContext } = useUpdatedMatrixWithAddedTask();
  const { removeTaskFromContext } = useUpdatedMatrixWithRemovedTask();

  const matrixRollback = _.cloneDeep(matrix);

  const findTaskByQuarterAndIndex = (sourceQuarterTitle: QuarterTitle, sourceTaskIndex: number) => {
    const quarter = matrix.find((quarter) => {
      return quarter.quarterTitle === sourceQuarterTitle;
    });
    return quarter?.tasks[sourceTaskIndex];
  };

  const moveTask = async (sourceTitleQuarter: QuarterTitle, targetTaskIndex: number) => {
    if (grabTask.sourceQuarterTitle === null || grabTask.sourceTaskIndex === null) return;
    const taskToMove = findTaskByQuarterAndIndex(grabTask.sourceQuarterTitle, grabTask.sourceTaskIndex);
    if (!taskToMove) return;

    removeTaskFromContext(grabTask.sourceQuarterTitle, taskToMove._id);
    addTaskToContext(sourceTitleQuarter, taskToMove, targetTaskIndex);

    try {
      await moveTaskInDB(sourceTitleQuarter, taskToMove, targetTaskIndex, grabTask.sourceQuarterTitle);
    } catch (error) {
      setMatrix(matrixRollback);
      console.error("can not add task to DB", error);
    }
  };
  return { moveTask };
};
