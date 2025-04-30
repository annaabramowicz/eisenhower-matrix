import { addTaskAction } from "../actions/actions";
import { useMatrixContext } from "../context/matrixContext";
import { useUpdatedMatrixWithAddedTask } from "./useUpdatedMatrixWithAddedTask";
import { NewTaskWithoutID, QuarterTitle, Task } from "../types/matrixTypes";
import _ from "lodash";

export const useAddTask = () => {
  const { matrix, setMatrix } = useMatrixContext();
  const { addTaskToContext } = useUpdatedMatrixWithAddedTask();
  const matrixRollback = _.cloneDeep(matrix);

  const addTask = async (sourceTitleQuarter: QuarterTitle, newTask: NewTaskWithoutID, targetTaskIndex?: number) => {
    const quarterToMove = matrix.find((quarter) => quarter.quarterTitle === sourceTitleQuarter);
    const sourceTasks = quarterToMove?.tasks ?? [];
    const calculatedTargetTaskIndex = targetTaskIndex ?? sourceTasks.length;

    try {
      const { insertedID } = await addTaskAction(sourceTitleQuarter, newTask.taskTitle, calculatedTargetTaskIndex);
      const taskWithID: Task = {
        taskTitle: newTask.taskTitle,
        _id: insertedID,
      };
      addTaskToContext(sourceTitleQuarter, taskWithID, calculatedTargetTaskIndex);
    } catch (error) {
      setMatrix(matrixRollback);
      console.error("can not add task to DB", error);
    }
  };

  return { addTask };
};
