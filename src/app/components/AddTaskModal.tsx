const AddTaskModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="absolute top-0 left-0 z-[999] w-screen h-screen bg-black/30 ">
      <dialog
        open
        className="flex justify-evenly flex-col items-center absolute inset-x-1/2 translate-x-[-50%] translate-y-1/2 h-[50vh] w-[50vh] rounded-md"
      >
        <div>Im a modal dialog</div>
        <button onClick={onClose}>Close</button>
      </dialog>
    </div>
  );
};

export default AddTaskModal;
