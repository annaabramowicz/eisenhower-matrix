export type Task = { title: string };

export type QuarterTitle = "DO FIRST" | "SCHEDULE" | "DELEGATE" | "DELETE";

export type QuarterTasks = { tasks: Task[] };

export type Matrix = Record<QuarterTitle, QuarterTasks>;

export type OnDropType = { styleLastElement?: string; onDrop: () => void };

export type TaskType = {
  positionTaskToMove: number;
  quarterTitle: QuarterTitle;
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
  matrix: { quarterActiveTask: QuarterTitle; title: string }[];
};
