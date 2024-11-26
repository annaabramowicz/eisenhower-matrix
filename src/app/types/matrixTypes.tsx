type Task = { id: string };

type Quarter = { title: string; tasks: Task[] };

export type TasksType = Quarter[];

export type onDropType = { onDrop: () => void };

export type TaskType = {
  index: number;
  quarterTitle: string;
  onDrop: (quarterTitle?: string, position?: number) => void;
};

export type QuarterTasksType = {
  quarterTasks: Quarter;
  onDrop: (titleQuarterToMove: string, positionTaskToMove: number) => void;
};

export type MatrixContextType = {
  quarterTasks: Quarter[];
  positionActiveTask: null | number;
  setPositionActiveTask: (index: number | null) => void;
  quarterActiveTask: null | string;
  setQuarterActiveTask: (quarter: string | null) => void;
};
