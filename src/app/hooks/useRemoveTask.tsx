import { Dispatch, SetStateAction } from "react";
import { TasksType } from "../types/matrixTypes";

export const useRemoveTask = (
  setTasks: Dispatch<SetStateAction<TasksType>>
) => {
  const removeTask = (groupActiveTask: string, positionActiveTask: number) => {
    setTasks((prevTask: TasksType) => {
      return prevTask.map((group) => {
        if (group.title === groupActiveTask) {
          return {
            ...group,
            tasks: group.tasks.filter(
              (_, index) => index !== positionActiveTask
            ),
          };
        }
        return group;
      });
    });
  };
  return removeTask;
};
