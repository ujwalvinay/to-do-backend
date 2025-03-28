const express = require("express");
const Task = require("../models/task");

const router = express.Router();

// Get tasks in a specific list
router.get("/list/:id", async (req, res) => {
  const tasks = await Task.find({ list: req.params.id });
  res.json(tasks);
});

// Add a new task to a list
router.post("/list/:id", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Task title is required" });

  try {
    const newTask = new Task({ title, list: req.params.id });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error adding task" });
  }
});

// Update a task
router.patch("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

module.exports = router;
