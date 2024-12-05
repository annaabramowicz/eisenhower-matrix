import { useState } from "react";
import { OnDropType } from "../types/matrixTypes";

const DropArea = ({ onDrop }: OnDropType) => {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={
        showDrop ? "p-4 bg-rose-200 transition-all	ease-in-out" : "opacity-0"
      }
    >
      Drop Here
    </section>
  );
};

export default DropArea;
