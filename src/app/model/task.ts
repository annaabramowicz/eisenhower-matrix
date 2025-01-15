import mongoose, { Schema, models } from "mongoose";

const TaskSchema = new Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  positionActiveTask: { type: Number, required: true },
  quarterActiveTask: { type: String, required: true },
});

const Task = models.Tasks || mongoose.model("Tasks", TaskSchema);

export default Task;
