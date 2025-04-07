"use server";

import connectDB from "../lib/connectDB";
import Quarter from "../model/quarter";
import { QuarterTitle } from "../types/matrixTypes";

export async function getQuartersFromDB() {
  await connectDB();
  const quarters = await Quarter.find({});
  const serializedQuarters = JSON.parse(JSON.stringify(quarters));
  return serializedQuarters;
}

export async function addTaskToDB(quarterTitle: QuarterTitle, taskTitle: string, taskPosition: number) {
  await connectDB();
  await Quarter.updateOne(
    { quarterTitle },
    {
      $push: {
        tasks: {
          $each: [{ taskTitle: taskTitle, taskPosition: taskPosition }],
          $position: taskPosition,
        },
      },
    }
  );
}

export async function removeTaskFromDB(taskPosition: number, quarterTitle: QuarterTitle) {
  await connectDB();
  // throw new Error("Error establishing a database connection");

  await Quarter.updateOne({ quarterTitle }, { $pull: { tasks: { taskPosition: taskPosition } } });
}

export async function incrementTaskPositionInDB(quarterTitle: QuarterTitle, taskPosition: number) {
  await connectDB();
  await Quarter.updateOne(
    { quarterTitle },
    { $inc: { "tasks.$[elem].taskPosition": 1 } },
    { arrayFilters: [{ "elem.taskPosition": { $gte: taskPosition } }] }
  );
}
export async function decrementTaskPositionInDB(positionActiveTask: number, quarterActiveTask: QuarterTitle) {
  await connectDB();
  await Quarter.updateOne(
    { quarterTitle: quarterActiveTask },
    { $inc: { "tasks.$[elem].taskPosition": -1 } },
    { arrayFilters: [{ "elem.taskPosition": { $gt: positionActiveTask } }] }
  );
}
export async function moveTaskInDB(
  positionActiveTask: number,
  targetQuarter: string,
  taskTitle: string,
  calculatedPosition: number,
  quarterActiveTask: QuarterTitle
) {
  await connectDB();
  // Aktualizacja tablicy zadań w kwartale 'quarterActiveTask' (dekremetacja)
  // Dekrementacja pozycji zadania w kwartale "quarterActiveTask"
  await Quarter.updateOne({ quarterTitle: quarterActiveTask }, [
    {
      $set: {
        tasks: {
          $let: {
            vars: {
              updatedTasks: {
                $map: {
                  input: "$tasks",
                  as: "task",
                  in: {
                    $cond: [
                      { $gte: ["$$task.taskPosition", positionActiveTask] },
                      {
                        $mergeObjects: ["$$task", { taskPosition: { $add: ["$$task.taskPosition", -1] } }],
                      },
                      "$$task",
                    ],
                  },
                },
              },
            },
            in: {
              $cond: [
                { $eq: [{ $size: "$$updatedTasks" }, 0] }, // Jeśli tablica jest pusta
                [], // Zwracamy pustą tablicę, ponieważ nie ma elementów do usunięcia
                {
                  $concatArrays: [
                    // Zamiast używać $slice, robimy to w sposób bardziej elastyczny
                    {
                      $cond: [
                        { $eq: [positionActiveTask, 0] }, // Jeśli pozycja jest 0
                        [], // Jeśli mamy 0, nie dzielimy, po prostu pomijamy pierwszą część
                        { $slice: ["$$updatedTasks", 0, positionActiveTask] }, // Elementy przed zadaniem
                      ],
                    },
                    {
                      $slice: [
                        "$$updatedTasks",
                        { $add: [positionActiveTask, 1] }, // Przesuwamy o 1, by ominąć zadanie do usunięcia
                        {
                          $cond: [
                            { $gt: [{ $size: "$$updatedTasks" }, positionActiveTask] },
                            { $subtract: [{ $size: "$$updatedTasks" }, positionActiveTask] },
                            1, // Gwarantujemy, że minimalna liczba elementów do pobrania to 1
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
  ]);

  // Przenoszenie zadania do kwartalu "targetQuarter"
  await Quarter.updateOne({ quarterTitle: targetQuarter }, [
    {
      $set: {
        tasks: {
          $let: {
            vars: {
              updatedTasks: {
                $map: {
                  input: "$tasks",
                  as: "task",
                  in: {
                    $cond: [
                      { $gte: ["$$task.taskPosition", calculatedPosition] },
                      {
                        $mergeObjects: ["$$task", { taskPosition: { $add: ["$$task.taskPosition", 1] } }],
                      },
                      "$$task",
                    ],
                  },
                },
              },
            },
            in: {
              $cond: [
                { $eq: [{ $size: "$$updatedTasks" }, 0] }, // Jeśli tablica jest pusta
                // Jeśli tablica jest pusta, to po prostu ustawiamy tablicę z jednym zadaniem
                [{ taskTitle: taskTitle, taskPosition: calculatedPosition }],
                {
                  $concatArrays: [
                    // Sprawdzamy, czy calculatedPosition to 0
                    {
                      $cond: [
                        { $eq: [calculatedPosition, 0] }, // Jeśli pozycja to 0
                        [], // Pusta tablica (pomijamy pierwszą część, bo dodamy zadanie na początek)
                        { $slice: ["$$updatedTasks", 0, calculatedPosition] }, // Elementy przed nowym zadaniem
                      ],
                    },
                    // Dodajemy nowe zadanie
                    [{ taskTitle: taskTitle, taskPosition: calculatedPosition }],
                    {
                      $slice: [
                        "$$updatedTasks",
                        calculatedPosition,
                        {
                          $cond: [
                            { $gt: [{ $size: "$$updatedTasks" }, calculatedPosition] },
                            { $subtract: [{ $size: "$$updatedTasks" }, calculatedPosition] },
                            1, // Gwarantujemy, że minimalna liczba elementów do pobrania to 1
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
  ]);
}
