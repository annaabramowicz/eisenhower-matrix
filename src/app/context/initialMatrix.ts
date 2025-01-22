import { Matrix } from "../types/matrixTypes";

export const initialMatrix: Matrix = {
  "DO FIRST": {
    tasks: [],
  },
  SCHEDULE: {
    tasks: [],
  },
  DELEGATE: {
    tasks: [],
  },
  DELETE: {
    tasks: [],
  },
} as const;
