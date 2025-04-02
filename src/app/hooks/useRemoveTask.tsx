import { decrementTaskPositionInDB, removeTaskFromDB } from "../actions/actions";
import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle } from "../types/matrixTypes";

export const useRemoveTask = () => {
  const { matrix, setMatrix } = useMatrixContext();
  const matrixRollback = matrix;

  const removeTask = async (quarterActiveTask: QuarterTitle, positionActiveTask: number, removeFromDB?: boolean) => {
    setMatrix((prevMatrix) =>
      prevMatrix.map((quarter) => {
        if (quarter.quarterTitle === quarterActiveTask) {
          const filteredTasks = quarter.tasks.filter((_, index) => index !== positionActiveTask);
          const updatedTasks = filteredTasks.map((task, index) => ({
            ...task,
            taskPosition: index,
          }));
          return { ...quarter, tasks: updatedTasks };
        }
        return quarter;
      })
    );

    try {
      if (removeFromDB) await removeTaskFromDB(positionActiveTask, quarterActiveTask);
      if (removeFromDB) await decrementTaskPositionInDB(positionActiveTask, quarterActiveTask);
    } catch (error) {
      setMatrix(matrixRollback);
      console.error("can not remove task from DB", error);
    }
  };

  return { removeTask };
};
