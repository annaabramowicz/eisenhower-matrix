export type Task = { taskTitle: string; _id: string };

export type NewTaskWithoutID = Omit<Task, "_id">;

export type QuarterTitle = "DO FIRST" | "SCHEDULE" | "DELEGATE" | "DELETE";

export type QuarterTasks = { tasks: Task[] };

export type Quarter = {
  _id: string;
  quarterTitle: QuarterTitle;
  tasks: Task[];
};

export type Matrix = Quarter[];

export type OnDropType = { styleLastElement?: string; onDrop: () => void };

export type TaskType = {
  quarterTitle: QuarterTitle;
  task: Task;
  sourceTaskIndex: number;
};

export type MatrixContextType = {
  matrix: Matrix;
  setMatrix: React.Dispatch<React.SetStateAction<Matrix>>;
  grabTask: {
    sourceTaskIndex: null | number;
    sourceQuarterTitle: null | QuarterTitle;
  };
  setGrabTask: React.Dispatch<
    React.SetStateAction<{
      sourceTaskIndex: null | number;
      sourceQuarterTitle: null | QuarterTitle;
    }>
  >;
};

export type ApiTaskData = {
  quarterActiveTask: QuarterTitle;
  title: string;
}[];
