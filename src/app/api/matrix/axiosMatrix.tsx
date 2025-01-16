import { QuarterTitle } from "@/app/types/matrixTypes";
import axios from "axios";

export async function addTaskToMatrixDB(quarterTitle: QuarterTitle, newTask: string, calculatedPosition: number) {
  try {
    await axios.post("/api/matrix", {
      title: newTask,
      positionActiveTask: calculatedPosition,
      quarterActiveTask: quarterTitle,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTaskFromMatrixDB(quarterTitle: QuarterTitle, calculatedPosition: number) {
  try {
    await axios.delete("/api/matrix", {
      data: {
        positionActiveTask: calculatedPosition,
        quarterActiveTask: quarterTitle,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

export async function moveTaskInMatrixDB(
  quarterActiveTask: QuarterTitle,
  positionActiveTask: number,
  quarterTitle: QuarterTitle,
  calculatedPosition: number
) {
  try {
    await axios.patch("/api/matrix", {
      quarterActiveTask,
      positionActiveTask,
      quarterTitle,
      calculatedPosition,
    });
  } catch (err) {
    console.log(err);
  }
}
