"use client";

import { Dispatch, SetStateAction } from "react";

type Tasks = {
  title: string;
  tasks: { id: string }[];
}[];

export const useRemoveTask = (setTasks: Dispatch<SetStateAction<Tasks>>) => {
  const removeTask = (groupActiveTask: string, positionActiveTask: number) => {
    setTasks((prevTask: Tasks) => {
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
