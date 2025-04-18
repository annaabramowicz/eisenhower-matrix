import { addTaskToDB } from "../actions/actions";
import { useMatrixContext } from "../context/matrixContext";
import { useUpdatedMatrixWithAddedTask } from "./useUpdatedMatrixWithAddedTask";
import { QuarterTitle, Task } from "../types/matrixTypes";
import _ from "lodash";

export const useAddTask = () => {
  const { matrix, setMatrix } = useMatrixContext();
  const { addTaskToContext } = useUpdatedMatrixWithAddedTask();
  const matrixRollback = _.cloneDeep(matrix);

  const addTask = async (sourceTitleQuarter: QuarterTitle, newTask: Task, targetTaskIndex?: number) => {
    const quarterToMove = matrix.find((quarter) => quarter.quarterTitle === sourceTitleQuarter);
    const sourceTasks = quarterToMove?.tasks ?? [];
    const calculatedTargetTaskIndex = targetTaskIndex ?? sourceTasks.length;

    addTaskToContext(sourceTitleQuarter, newTask, calculatedTargetTaskIndex);

    try {
      await addTaskToDB(sourceTitleQuarter, newTask.taskTitle, calculatedTargetTaskIndex);
    } catch (error) {
      setMatrix(matrixRollback);
      console.error("can not add task to DB", error);
    }
  };

  return { addTask };
};
