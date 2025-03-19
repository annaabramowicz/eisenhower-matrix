import mongoose, { Schema, models } from "mongoose";

const TaskSchema = new Schema({
  taskTitle: {
    type: String,
    required: true,
  },
  taskPosition: {
    type: Number,
    required: true,
  },
});

const QuarterSchema = new Schema({
  quarterTitle: {
    type: String,
    required: true,
  },
  tasks: [TaskSchema],
});

const Quarter = models.Quarter || mongoose.model("Quarter", QuarterSchema);

export default Quarter;
