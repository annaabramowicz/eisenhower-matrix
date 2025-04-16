import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle } from "../types/matrixTypes";

export const useUpdatedMatrixWithRemovedTask = () => {
  const { setMatrix } = useMatrixContext();

  const removeTaskFromContext = (quarterTitle: QuarterTitle, taskID: number) => {
    setMatrix((prevMatrix) =>
      prevMatrix.map((quarter) => {
        if (quarter.quarterTitle === quarterTitle) {
          const filteredTasks = quarter.tasks.filter((task) => task._id !== taskID);
          return { ...quarter, tasks: filteredTasks };
        }
        return quarter;
      })
    );
  };

  return { removeTaskFromContext };
};
