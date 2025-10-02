const express = require('express');
const router = express.Router();
const taskController = require('./tasks.controller');
const authMiddleware = require('../users/users.middleware');

// Apply authentication middleware to all task routes
router.use(authMiddleware);

// Create a new task
router.post('/', taskController.createTask);
// Get all tasks for a user
router.get('/', taskController.getUserTasks);
// Update a task's content or state
router.put('/:taskId', taskController.updateTaskState);

module.exports = router;
