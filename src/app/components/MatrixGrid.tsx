"use client";

import { useEffect, useState } from "react";
import AddTaskButton from "./AddTaskButton";
import Matrix from "./Matrix";
import MatrixSection from "./MatrixSection";
import { useMatrixContext } from "../context/matrixContext";
import Skeleton from "./Skeleton";
import { Matrix as MatrixType } from "../types/matrixTypes";

type MatrixGridProps = {
  matrix: MatrixType;
};

const MatrixGrid = ({ matrix }: MatrixGridProps) => {
  console.log("🚀 ~ MatrixGrid ~ matrix:", matrix);
  const { setMatrix } = useMatrixContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Pobierz bieżący stan matrycy z kontekstu
    setMatrix((prevMatrix) => {
      if (JSON.stringify(prevMatrix) !== JSON.stringify(matrix)) {
        // Ustaw nową matrycę tylko wtedy, gdy różni się od poprzedniej
        return matrix;
      }
      return prevMatrix; // Jeśli jest taka sama, nic nie zmieniaj
    });

    setLoading(false);
  }, [matrix, setMatrix]);

  return (
    <div className="grid grid-cols-[3rem_1fr_1fr] grid-rows-[3rem_1fr_1fr] gap-2 w-4/5 h-4/5">
      <AddTaskButton />
      <MatrixSection>URGENT</MatrixSection>
      <MatrixSection>NOT URGENT</MatrixSection>
      <MatrixSection className="[writing-mode:vertical-lr] [transform:rotate(180deg)]">IMPORTANT</MatrixSection>
      <div className="row-span-2 col-span-2 flex items-center justify-center  text-white font-bold rounded shadow">
        {/* 2 */}
        {/* <Suspense
          fallback={
            // <Skeleton />
            <>
              <div style={{ background: "red" }}>
                <h1>Ładowanie...</h1>
                <h1>Ładowanie...</h1>
                <h1>Ładowanie...</h1>
                <h1>Ładowanie...</h1>
                <h1>Ładowanie...</h1>
                <h1>Ładowanie...</h1>
                <h1>Ładowanie...</h1>
                <h1>Ładowanie...</h1>
                <h1>Ładowanie...</h1>
                <h1>Ładowanie...</h1>
                <h1>Ładowanie...</h1>
              </div>
            </>
          }
        >
          <Matrix />
        </Suspense> */}
        {/* 1 */}
        {/* {loading ? */}
        <Skeleton />
        {/* : <Matrix />} */}
      </div>
      <MatrixSection className="[writing-mode:vertical-lr] [transform:rotate(180deg)]">NOT IMPORTANT</MatrixSection>
    </div>
  );
};

export default MatrixGrid;
