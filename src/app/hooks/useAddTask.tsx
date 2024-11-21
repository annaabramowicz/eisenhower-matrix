import { Dispatch, SetStateAction } from "react";
import { TasksType } from "../types/matrixTypes";

export const useAddTask = (setTasks: Dispatch<SetStateAction<TasksType>>) => {
  const addTask = (
    groupTitle: string,
    index: number,
    newTask: { id: string }
  ) => {
    setTasks((prevTask: TasksType) => {
      return prevTask.map((group) => {
        if (group.title === groupTitle) {
          const newTasks = [...group.tasks];
          newTasks.splice(index, 0, newTask);
          return { ...group, tasks: newTasks };
        }
        return group;
      });
    });
  };
  return addTask;
};
