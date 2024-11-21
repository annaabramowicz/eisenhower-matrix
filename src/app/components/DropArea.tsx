import { useState } from "react";

const DropArea = ({ onDrop }: { onDrop: () => void }) => {
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
