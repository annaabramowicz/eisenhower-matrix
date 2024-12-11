const AddTaskModal = ({ onClose }) => {
  console.log("hej");
  return (
    <div className="modal">
      <div>Im a modal dialog</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddTaskModal;
