"use client";

import Item from "./Item";
import DropArea from "./DropArea";
import { createContext, useState } from "react";
import { useAddItem } from "../hooks/useAddItem";
import { useRemoveItem } from "../hooks/useRemoveItem";

type MatrixContextType = {
  matrixValues: { title: string; items: string[] }[];
  positionActiveItem: null | number;
  setPositionActiveItem: (index: number) => void;
  quarterActiveItem: null | string;
  setQuarterActiveItem: (quarter: string) => void;
};

const defaultMatrix = [
  { title: "quarter 1", items: ["1", "2", "3"] },
  { title: "quarter 2", items: ["4", "5"] },
  { title: "quarter 3", items: ["6"] },
  { title: "quarter 4", items: ["7", "8"] },
];

export const MatrixContext = createContext<MatrixContextType>({
  matrixValues: defaultMatrix,
  positionActiveItem: null,
  setPositionActiveItem: () => {},
  quarterActiveItem: null,
  setQuarterActiveItem: () => {},
});

const Matrix = () => {
  const [matrixValues, setMatrixValues] = useState(defaultMatrix);
  const [positionActiveItem, setPositionActiveItem] = useState<null | number>(
    null
  );
  const [quarterActiveItem, setQuarterActiveItem] = useState<null | string>(
    null
  );
  const removeItem = useRemoveItem(setMatrixValues);
  const addItem = useAddItem(setMatrixValues);

  const getItemByQuarterAndIndex = (quarterName: string, itemIndex: number) => {
    const quarter = matrixValues.find(({ title }) => title === quarterName);
    return quarter?.items[itemIndex] ?? "";
  };

  const onDrop = (nameQuarterToMove: string, positionItemToMove: number) => {
    if (quarterActiveItem === null || positionActiveItem === null) return;
    const itemToMove = getItemByQuarterAndIndex(
      quarterActiveItem,
      positionActiveItem
    );

    removeItem(quarterActiveItem, positionActiveItem);
    addItem(nameQuarterToMove, positionItemToMove, itemToMove);
  };
  return (
    <MatrixContext.Provider
      value={{
        matrixValues,
        positionActiveItem,
        setPositionActiveItem,
        quarterActiveItem,
        setQuarterActiveItem,
      }}
    >
      <div className="drag-and-drop">
        {matrixValues.map((quarterItems) => (
          <div key={quarterItems.title} className="dnd-group">
            <h2>{quarterItems.title}</h2>
            <DropArea onDrop={() => onDrop(quarterItems.title, 0)} />
            {quarterItems.items.map((item, index) => {
              return (
                <Item
                  key={item}
                  index={index}
                  quarterTitle={quarterItems.title}
                  onDrop={() => onDrop(quarterItems.title, index + 1)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </MatrixContext.Provider>
  );
};

export default Matrix;
