// server/controllers/taskController.js
const { validationResult } = require('express-validator');
const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, status, priority, dueDate, subtasks } = req.body;

    const newTask = new Task({
      user: req.user.id,
      title,
      description,
      status: status || 'todo',
      priority: priority || 'medium',
      dueDate,
      subtasks: subtasks || []
      // Project field removed
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get tasks with optional filtering
exports.getTasks = async (req, res) => {
  console.log(req.body) 
  try {
    const { status, priority, completed } = req.query;
    
    
    // Build query
    const query = { user: req.user.id };
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    
  
    
    const tasks = await Task.find(query).sort({ dueDate: 1, createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    
    // Check task belongs to user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
    // Project field removed
    
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    
    // Check task belongs to user
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
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    
    // Check task belongs to user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    await Task.findByIdAndRemove(req.params.id);
    
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Toggle task completion status
exports.toggleTaskComplete = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    
    // Check task belongs to user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Toggle status between 'done' and previous status (or 'todo' if in 'done')
    if (task.status === 'done') {
      task.status = 'todo';
    } else {
      task.status = 'done';
    }
    
    await task.save();
    
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};