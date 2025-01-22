import { ApiTaskData, Matrix } from "../types/matrixTypes";

export const mapperTaskApiData = (data: ApiTaskData, initialMatrix: Matrix) => {
  const newMatrix = data.reduce((acc, task) => {
    const group = task.quarterActiveTask;
    if (!acc[group]) acc[group] = { tasks: [] };
    acc[group].tasks.push({ title: task.title });
    return acc;
  }, initialMatrix);

  return newMatrix;
};
