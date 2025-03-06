import mongoose, { Schema, models } from "mongoose";

const QuarterSchema = new Schema({
  quarterTitle: { type: String, require: true },
  tasks: [
    {
      title: {
        type: String,
        required: true,
      },
      positionTask: { type: Number, required: true },
    },
  ],
});

const Quarter = models.Quarters || mongoose.model("Quarters", QuarterSchema);

export default Quarter;
