"use client";

import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import AddTaskButton from "./AddTaskButton";
import Matrix from "./Matrix";
import MatrixSection from "./MatrixSection";
import axios from "axios";
import { initialMatrix, useMatrixContext } from "../context/matrixContext";
import { mapperTaskApiData } from "../helpers/mapperTaskApiData";
import Skeleton from "./Skeleton";

// 2
// const Matrix = lazy(() => import("./Matrix"));

const MatrixGrid = () => {
  const { setMatrix } = useMatrixContext();
  // 1
  const [loading, setLoading] = useState(true);

  const getMatrixDB = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/matrix");
      const newMatrix = mapperTaskApiData(data, initialMatrix);
      setMatrix(newMatrix);
      // 1
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [setMatrix]);

  useEffect(() => {
    getMatrixDB();
  }, [getMatrixDB]);

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
        {loading ? <Skeleton /> : <Matrix />}
      </div>
      <MatrixSection className="[writing-mode:vertical-lr] [transform:rotate(180deg)]">NOT IMPORTANT</MatrixSection>
    </div>
  );
};

export default MatrixGrid;
