
const router = require("express").Router();

const taskController = require('../controller/taskController')


// Create a new task
router.post('/create', taskController.createTask);

// Get all tasks with pagination and search
router.get('/get', taskController.getTasks);

// Get a single task by ID
router.get('/:id', taskController.getTaskById);

// Update a task by ID
router.put('/update/:id', taskController.updateTask);

// Delete a task by ID
router.delete('/:id', taskController.deleteTask);


module.exports = router;
