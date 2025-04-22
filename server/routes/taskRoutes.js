const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Private
 */
router.post(
  '/',
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('title', 'Title cannot exceed 100 characters').isLength({ max: 100 }),
    check('description', 'Description cannot exceed 1000 characters')
      .optional()
      .isLength({ max: 1000 }),
    check('priority', 'Priority must be low, medium, high, or urgent')
      .optional()
      .isIn(['low', 'medium', 'high', 'urgent']),
    check('status', 'Status must be a valid task status')
      .optional()
      .isIn(['backlog', 'todo', 'in-progress', 'review', 'done']),
    check('dueDate', 'Due date must be a valid date')
      .optional()
      .isISO8601()
  ],
  taskController.createTask
);

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks for authenticated user with filtering options
 * @access  Private
 */
router.get('/', auth, taskController.getTasks);

/**
 * @route   GET /api/tasks/:id
 * @desc    Get task by ID
 * @access  Private
 */
router.get('/:id', auth, taskController.getTaskById);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task
 * @access  Private
 */
router.put(
  '/:id',
  auth,
  [
    check('title', 'Title cannot exceed 100 characters')
      .optional()
      .isLength({ max: 100 }),
    check('description', 'Description cannot exceed 1000 characters')
      .optional()
      .isLength({ max: 1000 }),
    check('priority', 'Priority must be low, medium, high, or urgent')
      .optional()
      .isIn(['low', 'medium', 'high', 'urgent']),
    check('status', 'Status must be a valid task status')
      .optional()
      .isIn(['backlog', 'todo', 'in-progress', 'review', 'done']),
    check('dueDate', 'Due date must be a valid date')
      .optional()
      .isISO8601()
  ],
  taskController.updateTask
);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Private
 */
router.delete('/:id', auth, taskController.deleteTask);

/**
 * @route   PATCH /api/tasks/:id/toggle-complete
 * @desc    Toggle task completion status
 * @access  Private
 */
router.patch('/:id/toggle-complete', auth, taskController.toggleTaskComplete);

/**
 * @route   GET /api/tasks/project/:projectId
 * @desc    Get all tasks for a specific project
 * @access  Private
 */
router.get('/project/:projectId', auth, (req, res) => {
  // Add projectId to query params and call getTasks
  req.query.projectId = req.params.projectId;
  taskController.getTasks(req, res);
});

/**
 * @route   GET /api/tasks/status/:status
 * @desc    Get all tasks with a specific status
 * @access  Private
 */
router.get('/status/:status', auth, (req, res) => {
  // Add status to query params and call getTasks
  req.query.status = req.params.status;
  taskController.getTasks(req, res);
});

/**
 * @route   GET /api/tasks/due-soon
 * @desc    Get tasks due within the next 3 days
 * @access  Private
 */
router.get('/due-soon', auth, (req, res) => {
  // Calculate date range for the next 3 days
  const today = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);
  
  // Add date range to query params
  req.query.startDate = today.toISOString();
  req.query.endDate = threeDaysLater.toISOString();
  req.query.completed = 'false'; // Only include incomplete tasks
  
  // Call getTasks with modified query
  taskController.getTasks(req, res);
});

module.exports = router;