"use client";

import DropArea from "./DropArea";
import Item from "./Item";

type Items = {
  title: string;
  items: string[];
}[];

type MatrixProps = {
  items: Items;
  setPositionActiveItem: (index: number | null) => void;
  setGroupActiveItem: (title: string | null) => void;
  onDrop: (groupTitle: string, position: number) => void;
};

const Matrix = ({
  items,
  setPositionActiveItem,
  setGroupActiveItem,
  onDrop,
}: MatrixProps) => {
  return (
    <div className="drag-and-drop">
      {items.map((groupItems) => (
        <div key={groupItems.title} className="dnd-group">
          <h2>{groupItems.title}</h2>
          <DropArea onDrop={() => onDrop(groupItems.title, 0)} />
          {groupItems.items.map((item, index) => {
            return (
              <Item
                key={item}
                item={item}
                index={index}
                groupTitle={groupItems.title}
                setPositionActiveItem={setPositionActiveItem}
                setGroupActiveItem={setGroupActiveItem}
                onDrop={() => onDrop(groupItems.title, index + 1)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Matrix;
