const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
