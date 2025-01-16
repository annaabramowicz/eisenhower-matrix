"use client";

import { useCallback, useEffect } from "react";
import AddTaskButton from "./AddTaskButton";
import Matrix from "./Matrix";
import MatrixSection from "./MatrixSection";
import axios from "axios";
import { initialMatrix, useMatrixContext } from "../context/matrixContext";
import { mapperTaskApiData } from "../helpers/mapperTaskApiData";

const MatrixGrid = () => {
  const { setMatrix } = useMatrixContext();

  const getMatrixDB = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/matrix");
      const newMatrix = mapperTaskApiData(data, initialMatrix);
      setMatrix(newMatrix);
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
        <Matrix />
      </div>
      <MatrixSection className="[writing-mode:vertical-lr] [transform:rotate(180deg)]">NOT IMPORTANT</MatrixSection>
    </div>
  );
};

export default MatrixGrid;
