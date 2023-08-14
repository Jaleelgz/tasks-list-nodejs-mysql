const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasks.controller");

// Retrieve all tasks
router.get("/all", taskController.findAll);

// Create a new task
router.post("/", taskController.create);

// Retrieve a single task with id
router.get("/:id", taskController.findById);

// Update a task with id
router.put("/:id", taskController.update);

// Delete a task with id
router.delete("/:id", taskController.delete);

module.exports = router;
