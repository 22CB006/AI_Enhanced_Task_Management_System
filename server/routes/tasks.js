// server/routes/tasks.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// Get all tasks for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a new task
router.post('/', auth, async (req, res) => {
  console.log("Incoming task body:", req.body);
  try {
    const { title, description, status, priority, dueDate, subtasks } = req.body;

    const newTask = new Task({
      title,
      description,
      status: status || 'todo',
      priority: priority || 'medium',
      dueDate,
      subtasks: subtasks || [],
      user: req.user.id
      // Project field removed from here
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, subtasks } = req.body;

    // Build task object
    const taskFields = {};
    if (title !== undefined) taskFields.title = title;
    if (description !== undefined) taskFields.description = description;
    if (status !== undefined) taskFields.status = status;
    if (priority !== undefined) taskFields.priority = priority;
    if (dueDate !== undefined) taskFields.dueDate = dueDate;
    if (subtasks !== undefined) taskFields.subtasks = subtasks;
    // Project field removed from here

    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a subtask to a task
router.post('/:id/subtask', auth, async (req, res) => {
  try {
    const { title } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const newSubtask = {
      title,
      completed: false
    };

    task.subtasks.push(newSubtask);
    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a subtask
router.put('/:id/subtask/:subtaskId', auth, async (req, res) => {
  try {
    const { completed, title } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const subtaskIndex = task.subtasks.findIndex(
      subtask => subtask._id.toString() === req.params.subtaskId
    );

    if (subtaskIndex === -1) {
      return res.status(404).json({ msg: 'Subtask not found' });
    }

    if (completed !== undefined) task.subtasks[subtaskIndex].completed = completed;
    if (title !== undefined) task.subtasks[subtaskIndex].title = title;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;