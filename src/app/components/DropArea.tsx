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
      className={showDrop ? "drop-area" : "hide-drop"}
    >
      Drop Here
    </section>
  );
};

export default DropArea;
