import { useState } from "react";
import { createPortal } from "react-dom";
import AddTaskModal from "./AddTaskModal";

const AddTaskButton = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex items-center justify-center text-white font-bold rounded shadow ">
      <button className="btn p-3" onClick={() => setShowModal(true)}>
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {showModal &&
        createPortal(
          <AddTaskModal onClose={() => setShowModal(false)} />,
          document.body
        )}
    </div>
  );
};
export default AddTaskButton;
