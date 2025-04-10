import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle } from "../types/matrixTypes";

export const useUpdatedMatrixWithRemovedTask = () => {
  const { setMatrix } = useMatrixContext();

  const removeTaskFromContext = (quarterActiveTask: QuarterTitle, positionActiveTask: number) => {
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
  };

  return { removeTaskFromContext };
};
