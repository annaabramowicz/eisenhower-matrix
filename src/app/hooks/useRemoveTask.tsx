import { deleteTaskFromMatrixDB } from "../api/matrix/axiosMatrix";
import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle } from "../types/matrixTypes";

export const useRemoveTask = () => {
  const { setMatrix } = useMatrixContext();

  const removeTask = (quarterActiveTask: QuarterTitle, positionActiveTask: number) => {
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
    deleteTaskFromMatrixDB(quarterActiveTask, positionActiveTask);
  };

  return { removeTask };
};
