import DropArea from "./DropArea";
import Item from "./Item";

type quarterItemsType = {
  quarterItems: { title: string; items: { id: string }[] };
  onDrop: (titleQuarterToMove: string, positionItemToMove: number) => void;
};

const Quarter = ({ quarterItems, onDrop }: quarterItemsType) => {
  return (
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
  );
};

export default Quarter;
