const ErrorConnectionBDModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex items-center absolute top-0 left-0 z-[999] w-screen h-screen bg-black/30 ">
      <dialog open id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Error!</h3>
          <p className="py-4">Problem with Data Base connection</p>
        </div>
      </dialog>
    </div>
  );
};

export default ErrorConnectionBDModal;
