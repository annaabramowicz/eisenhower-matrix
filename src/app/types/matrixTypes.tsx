type Task = { id: string };

export type Quarter = { title: string; tasks: Task[] };

export type TasksType = Quarter[];

export type OnDropType = { onDrop: () => void };

export type TaskType = {
  positionTaskToMove: number;
  quarterTitle: string;
  onDrop: (quarterTitle?: string, position?: number) => void;
};

export type QuarterTasksType = {
  quarterTasks: Quarter;
  onDrop: (titleQuarterToMove: string, positionTaskToMove: number) => void;
};

export type MatrixContextType = {
  matrix: Quarter[];
  setMatrix: React.Dispatch<React.SetStateAction<Quarter[]>>;
  positionActiveTask: null | number;
  setPositionActiveTask: (index: number | null) => void;
  quarterActiveTask: null | string;
  setQuarterActiveTask: (quarter: string | null) => void;
};
