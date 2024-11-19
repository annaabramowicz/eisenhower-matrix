"use client";

import DropArea from "./DropArea";

const Item = ({
  item,
  index,
  groupTitle,
  setPositionActiveItem,
  setGroupActiveItem,
  onDrop,
}: {
  item: string;
  index: number;
  groupTitle: string;
  setPositionActiveItem: (index: number | null) => void;
  setGroupActiveItem: (index: string | null) => void;
  onDrop: (groupTitle?: string, position?: number) => void;
}) => {
  return (
    <>
      <div
        draggable
        onDragStart={() => {
          setPositionActiveItem(index);
          setGroupActiveItem(groupTitle);
        }}
        className="dnd-item"
      >
        <p>{item}</p>
      </div>
      <DropArea onDrop={() => onDrop()} />
    </>
  );
};
export default Item;
