export type Task = { taskTitle: string; _id: number };

export type QuarterTitle = "DO FIRST" | "SCHEDULE" | "DELEGATE" | "DELETE";

export type QuarterTasks = { tasks: Task[] };

export type Quarter = {
  quarterTitle: QuarterTitle;
  tasks: Task[];
};

export type Matrix = Quarter[];

export type OnDropType = { styleLastElement?: string; onDrop: () => void };

export type TaskType = {
  quarterTitle: QuarterTitle;
  task: Task;
};

export type MatrixContextType = {
  matrix: Matrix;
  setMatrix: React.Dispatch<React.SetStateAction<Matrix>>;
  activeTask: {
    positionActiveTask: null | number;
    quarterActiveTask: null | QuarterTitle;
  };
  setActiveTask: React.Dispatch<
    React.SetStateAction<{
      positionActiveTask: null | number;
      quarterActiveTask: null | QuarterTitle;
    }>
  >;
};

export type ApiTaskData = {
  quarterActiveTask: QuarterTitle;
  title: string;
}[];
