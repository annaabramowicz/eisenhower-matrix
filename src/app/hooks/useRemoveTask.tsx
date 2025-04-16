import { removeTaskFromDB } from "../actions/actions";
import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle } from "../types/matrixTypes";
import { useUpdatedMatrixWithRemovedTask } from "./useUpdatedMatrixWithRemovedTask";
import _ from "lodash";

export const useRemoveTask = () => {
  const { matrix, setMatrix } = useMatrixContext();
  const { removeTaskFromContext } = useUpdatedMatrixWithRemovedTask();
  const matrixRollback = _.cloneDeep(matrix);

  const removeTask = async (quarterTitle: QuarterTitle, taskID: number) => {
    removeTaskFromContext(quarterTitle, taskID);

    // try {
    //   await removeTaskFromDB(positionActiveTask, quarterTitle);
    // } catch (error) {
    //   setMatrix(matrixRollback);
    //   console.error("can not remove task from DB", error);
    // }
  };

  return { removeTask };
};
