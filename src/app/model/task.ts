import mongoose, { Schema, models } from "mongoose";

const TaskSchema = new Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
});

const Task = models.Task || mongoose.model("Task", TaskSchema);

export default Task;
