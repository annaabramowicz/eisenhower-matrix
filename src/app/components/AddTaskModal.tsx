import { z } from "zod";
import { useAddTask } from "../hooks/useAddTask";
import { quarterTitleSchema } from "../types/zodSchemas";

const AddTaskModal = ({ onClose }: { onClose: () => void }) => {
  const { addTask } = useAddTask();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const taskSchema = z.object({
      taskTitle: z.string().min(1, "Task name is required"),
      quarterTitle: quarterTitleSchema,
    });

    const formData = new FormData(event.currentTarget);
    const modalInput = {
      taskTitle: formData.get("new-task"),
      quarterTitle: formData.get("quarter"),
    };

    const result = taskSchema.safeParse(modalInput);

    if (!result.success) {
      console.error("Validation failed:", result.error.format());
      return;
    }

    addTask(result.data.quarterTitle, { title: result.data.taskTitle }, undefined, true);
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
            <select name="quarter" className="select select-bordered w-full max-w-xs" required>
              <option>DO FIRST</option>
              <option>SCHEDULE</option>
              <option>DELEGATE</option>
              <option>DELETE</option>
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
