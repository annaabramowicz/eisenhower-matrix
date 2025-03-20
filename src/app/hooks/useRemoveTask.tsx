import { removeTaskFromDB } from "../actions/actions";
import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle } from "../types/matrixTypes";

export const useRemoveTask = () => {
  const { setMatrix } = useMatrixContext();

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

    if (removeFromDB) await removeTaskFromDB(positionActiveTask, quarterActiveTask);
  };

  return { removeTask };
};
