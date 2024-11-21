"use client";

import { Dispatch, SetStateAction } from "react";

type Tasks = {
  title: string;
  tasks: { id: string }[];
}[];

export const useAddTask = (setTasks: Dispatch<SetStateAction<Tasks>>) => {
  const addTask = (
    groupTitle: string,
    index: number,
    newTask: { id: string }
  ) => {
    setTasks((prevTask: Tasks) => {
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
