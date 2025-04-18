import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle } from "../types/matrixTypes";

export const useUpdatedMatrixWithRemovedTask = () => {
  const { setMatrix } = useMatrixContext();

  const removeTaskFromContext = (targetQuarterTitle: QuarterTitle, grabTaskID: string) => {
    setMatrix((prevMatrix) =>
      prevMatrix.map((quarter) => {
        if (quarter.quarterTitle === targetQuarterTitle) {
          const filteredTasks = quarter.tasks.filter((task) => task._id !== grabTaskID);
          return { ...quarter, tasks: filteredTasks };
        }
        return quarter;
      })
    );
  };

  return { removeTaskFromContext };
};
