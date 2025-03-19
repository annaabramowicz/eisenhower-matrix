import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle } from "../types/matrixTypes";

export const useRemoveTask = () => {
  const { setMatrix } = useMatrixContext();

  const removeTask = async (quarterActiveTask: QuarterTitle, positionActiveTask: number, removeFromDB?: boolean) => {
    setMatrix((prevMatrix) => {
      const updatedQuarterTasks = prevMatrix[quarterActiveTask].tasks.filter(
        (_, index) => index !== positionActiveTask
      );
      return {
        ...prevMatrix,
        [quarterActiveTask]: {
          ...prevMatrix[quarterActiveTask],
          tasks: updatedQuarterTasks,
        },
      };
    });
    // if (removeFromDB) await removeTaskFromDB(positionActiveTask, quarterActiveTask);
  };

  return { removeTask };
};
