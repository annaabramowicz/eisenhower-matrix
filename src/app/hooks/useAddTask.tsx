import { addTaskToDB } from "../actions/actions";
import { useMatrixContext } from "../context/matrixContext";
import { useUpdatedMatrixWithAddedTask } from "./useUpdatedMatrixWithAddedTask";
import { QuarterTitle, Task } from "../types/matrixTypes";
import _ from "lodash";

export const useAddTask = () => {
  const { matrix, setMatrix } = useMatrixContext();
  const { addTaskToContext } = useUpdatedMatrixWithAddedTask();
  const matrixRollback = _.cloneDeep(matrix);

  const addTask = async (quarterTitle: QuarterTitle, newTask: Task, positionTaskToMove?: number) => {
    const quarterToMove = matrix.find((quarter) => quarter.quarterTitle === quarterTitle);
    const calculatedPosition = positionTaskToMove ?? quarterToMove?.tasks.length ?? 0;

    addTaskToContext(quarterTitle, newTask, calculatedPosition);

    try {
      await addTaskToDB(quarterTitle, newTask.taskTitle, calculatedPosition);
    } catch (error) {
      setMatrix(matrixRollback);
      console.error("can not add task to DB", error);
    }
  };

  return { addTask };
};
