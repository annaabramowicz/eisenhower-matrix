import { useOptimistic } from "react";
import { startTransition } from "react";
import { addTaskToDB } from "../actions/actions";
import { useMatrixContext } from "../context/matrixContext";
import { QuarterTitle, Task } from "../types/matrixTypes";

type OptimisticUpdateData = {
  quarterTitle: QuarterTitle;
  newTask: Task;
  calculatedPosition: number;
};

export const useAddTask = () => {
  const { matrix, setMatrix } = useMatrixContext();

  const [optimisticMatrix, applyOptimisticUpdate] = useOptimistic(
    matrix,
    (prevMatrix, updateData: OptimisticUpdateData) => {
      console.log("nic");
      console.log("🚀 ~ useAddTask ~ prevMatrix:", prevMatrix);
      return prevMatrix.map((quarter) => {
        if (quarter.quarterTitle !== updateData.quarterTitle) return quarter;
        const updatedTasks = quarter.tasks.map((task) => ({
          ...task,
          taskPosition: task.taskPosition >= updateData.calculatedPosition ? task.taskPosition + 1 : task.taskPosition,
        }));
        const updatedTask = { ...updateData.newTask, taskPosition: updateData.calculatedPosition };
        updatedTasks.splice(updateData.calculatedPosition, 0, updatedTask);
        return { ...quarter, tasks: updatedTasks };
      });
      setMatrix(optimisticMatrix);
    }
  );
  console.log("🚀 ~ useAddTask ~ optimisticMatrix:", optimisticMatrix);
  console.log("🚀 ~ useAddTask ~ matrix:", matrix);

  const addTask = async (quarterTitle: QuarterTitle, newTask: Task, positionTaskToMove?: number, addToDB?: boolean) => {
    const quarterToMove = optimisticMatrix.find((quarter) => quarter.quarterTitle === quarterTitle);
    const calculatedPosition = positionTaskToMove ?? quarterToMove?.tasks.length ?? 0;

    console.log("hej");
    startTransition(() => {
      console.log("transition");
      applyOptimisticUpdate({ quarterTitle, newTask, calculatedPosition });
    });

    try {
      if (addToDB) {
        await addTaskToDB(quarterTitle, newTask.taskTitle, calculatedPosition);
      }
    } catch (error) {
      setMatrix(matrix);
      console.error("can not add task to DB", error);
    }
  };

  return { addTask };
};
