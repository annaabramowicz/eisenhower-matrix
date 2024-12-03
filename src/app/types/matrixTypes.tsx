type Task = { id: string };

export type Quarter = { title: string; tasks: Task[] };

export type TasksType = Quarter[];

export type OnDropType = { onDrop: () => void };

export type TaskType = {
  positionTaskToMove: number;
  quarterTitle: string;
};

export type QuarterTasksType = {
  quarterTasks: Quarter;
};

export type MatrixContextType = {
  matrix: Quarter[];
  setMatrix: React.Dispatch<React.SetStateAction<Quarter[]>>;
  activeTask: {
    positionActiveTask: null | number;
    quarterActiveTask: null | string;
  };
  setActiveTask: React.Dispatch<
    React.SetStateAction<{
      positionActiveTask: null | number;
      quarterActiveTask: null | string;
    }>
  >;
};
