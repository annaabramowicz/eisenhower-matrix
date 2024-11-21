"use client";

import DropArea from "./DropArea";
import { useContext } from "react";
import { MatrixContext } from "./Matrix";

const Item = ({
  index,
  quarterTitle,
  onDrop,
}: {
  index: number;
  quarterTitle: string;
  onDrop: (quarterTitle?: string, position?: number) => void;
}) => {
  const { matrixValues, setQuarterActiveItem, setPositionActiveItem } =
    useContext(MatrixContext);

  const matrixQuarter = matrixValues.find(
    (quarter) => quarter.title === quarterTitle
  );
  const renderedItem = matrixQuarter?.items[index];
  return (
    <>
      <div
        draggable
        onDragStart={() => {
          setPositionActiveItem(index);
          setQuarterActiveItem(quarterTitle);
        }}
        className="dnd-item"
      >
        <p>{renderedItem}</p>
      </div>
      <DropArea onDrop={() => onDrop()} />
    </>
  );
};
export default Item;
