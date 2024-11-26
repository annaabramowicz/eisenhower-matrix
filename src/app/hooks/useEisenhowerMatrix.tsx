import { useState } from "react";

const defaultMatrix = [
  { title: "quarter 1", tasks: [{ id: "1" }, { id: "2" }, { id: "3" }] },
  { title: "quarter 2", tasks: [{ id: "4" }, { id: "5" }] },
  { title: "quarter 3", tasks: [{ id: "6" }] },
  { title: "quarter 4", tasks: [{ id: "7" }, { id: "8" }] },
];

export const useEisenhowerMatrix = () => {
  const [quarterTasks, setQuarterTasks] = useState(defaultMatrix);

  const addTask = (
    groupTitle: string,
    positionTaskToMove: number,
    newTask: { id: string }
  ) => {
    const newTasks = quarterTasks.map((group) => {
      if (group.title === groupTitle) {
        const newTasks = [...group.tasks];
        newTasks.splice(positionTaskToMove, 0, newTask);
        return { ...group, tasks: newTasks };
      }
      return group;
    });
    setQuarterTasks(newTasks);
  };
  const removeTask = (groupActiveTask: string, positionActiveTask: number) => {
    const taskToRemove = quarterTasks.map((group) => {
      if (group.title === groupActiveTask) {
        return {
          ...group,
          tasks: group.tasks.filter((_, index) => index !== positionActiveTask),
        };
      }
      return group;
    });
    setQuarterTasks(taskToRemove);
  };
  return { quarterTasks, addTask, removeTask };
};
