"use client";

import Item from "./Item";
import DropArea from "./DropArea";
import { createContext, useState } from "react";
import { useAddItem } from "../hooks/useAddItem";
import { useRemoveItem } from "../hooks/useRemoveItem";

type MatrixContextType = {
  matrixItems: { title: string; items: { id: string }[] }[];
  positionActiveItem: null | number;
  setPositionActiveItem: (index: number | null) => void;
  quarterActiveItem: null | string;
  setQuarterActiveItem: (quarter: string | null) => void;
};

const defaultMatrix = [
  { title: "quarter 1", items: [{ id: "1" }, { id: "2" }, { id: "3" }] },
  { title: "quarter 2", items: [{ id: "4" }, { id: "5" }] },
  { title: "quarter 3", items: [{ id: "6" }] },
  { title: "quarter 4", items: [{ id: "7" }, { id: "8" }] },
];

export const MatrixContext = createContext<MatrixContextType>({
  matrixItems: defaultMatrix,
  positionActiveItem: null,
  setPositionActiveItem: () => {},
  quarterActiveItem: null,
  setQuarterActiveItem: () => {},
});

const Matrix = () => {
  const [matrixItems, setMatrixItems] = useState(defaultMatrix);
  const [positionActiveItem, setPositionActiveItem] = useState<null | number>(
    null
  );
  const [quarterActiveItem, setQuarterActiveItem] = useState<null | string>(
    null
  );
  const removeItem = useRemoveItem(setMatrixItems);
  const addItem = useAddItem(setMatrixItems);

  const getItemByQuarterAndIndex = (quarterName: string, itemIndex: number) => {
    const quarter = matrixItems.find(({ title }) => title === quarterName);
    return quarter?.items[itemIndex];
  };

  const onDrop = (nameQuarterToMove: string, positionItemToMove: number) => {
    if (quarterActiveItem === null || positionActiveItem === null) return;
    const itemToMove = getItemByQuarterAndIndex(
      quarterActiveItem,
      positionActiveItem
    );
    if (!itemToMove) return;

    removeItem(quarterActiveItem, positionActiveItem);
    addItem(nameQuarterToMove, positionItemToMove, itemToMove);
  };
  return (
    <MatrixContext.Provider
      value={{
        matrixItems,
        positionActiveItem,
        setPositionActiveItem,
        quarterActiveItem,
        setQuarterActiveItem,
      }}
    >
      <div className="drag-and-drop">
        {matrixItems.map((quarterItems) => (
          <div key={quarterItems.title} className="dnd-group">
            <h2>{quarterItems.title}</h2>
            <DropArea onDrop={() => onDrop(quarterItems.title, 0)} />
            {quarterItems.items.map((item, index) => {
              return (
                <Item
                  key={item.id}
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
