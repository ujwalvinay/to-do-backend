const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  list: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
});

module.exports = mongoose.model("Task", TaskSchema);
