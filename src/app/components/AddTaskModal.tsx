import { useAddTask } from "../hooks/useAddTask";
import { QuarterTitle } from "../types/enums";

const AddTaskModal = ({ onClose }: { onClose: () => void }) => {
  const { addTask } = useAddTask();

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const taskName = formData.get("new-task");
    const taskQuarter = formData.get("quarter");

    addTask(`${taskQuarter}`, { id: taskName });
    onClose();
  };

  return (
    <div className="flex items-center absolute top-0 left-0 z-[999] w-screen h-screen bg-black/30 ">
      <dialog open className="max-w-sm w-[50vh] rounded-md">
        <div className="rounded-md bg-base-100 w-full ">
          <form className="card-body " onSubmit={submit}>
            <input
              type="text"
              name="new-task"
              placeholder="NEW TASK"
              className="input input-bordered w-full max-w-xs"
              required
            />
            <select
              name="quarter"
              className="select select-bordered w-full max-w-xs"
              required
            >
              <option>{QuarterTitle.doFirst}</option>
              <option>{QuarterTitle.schedule}</option>
              <option>{QuarterTitle.delegate}</option>
              <option>{QuarterTitle.delete}</option>
            </select>

            <div className="form-control mt-6">
              <button className="btn" onClick={onClose}>
                Close
              </button>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddTaskModal;
