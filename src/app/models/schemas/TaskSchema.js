const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    completed: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
