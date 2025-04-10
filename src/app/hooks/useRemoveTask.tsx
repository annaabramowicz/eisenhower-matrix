import { removeTaskFromDB } from "../actions/actions";
import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle } from "../types/matrixTypes";
import { useUpdatedMatrixWithRemovedTask } from "./useUpdatedMatrixWithRemovedTask";
import _ from "lodash";

export const useRemoveTask = () => {
  const { matrix, setMatrix } = useMatrixContext();
  const { removeTaskFromContext } = useUpdatedMatrixWithRemovedTask();
  const matrixRollback = _.cloneDeep(matrix);

  const removeTask = async (quarterActiveTask: QuarterTitle, positionActiveTask: number) => {
    removeTaskFromContext(quarterActiveTask, positionActiveTask);

    try {
      await removeTaskFromDB(positionActiveTask, quarterActiveTask);
    } catch (error) {
      setMatrix(matrixRollback);
      console.error("can not remove task from DB", error);
    }
  };

  return { removeTask };
};
