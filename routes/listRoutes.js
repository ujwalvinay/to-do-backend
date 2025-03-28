const express = require("express");
const List = require("../models/list");

const router = express.Router();


// Get details of a specific list by ID
router.get("/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: "Error fetching list" });
  }
});


// Get all lists
router.get("/", async (req, res) => {
  const lists = await List.find();
  res.json(lists);
});

// Create a new list
router.post("/", async (req, res) => {
  const { name, essential } = req.body;
  if (!name) return res.status(400).json({ error: "List name is required" });

  try {
    const newList = new List({ name });
    await newList.save();
    res.json(newList);
  } catch (error) {
    res.status(500).json({ error: "Error creating list" });
  }
});


// ✅ New route to delete a list by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedList = await List.findByIdAndDelete(req.params.id);
    if (!deletedList) {
      return res.status(404).json({ error: "List not found" });
    }
    res.json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting list" });
  }
});


module.exports = router;
