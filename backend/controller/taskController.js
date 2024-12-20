const Task = require('../model/taskModel');

// Create a new task
const createTask = async (req, res) => {
    console.log(req.body);
    try {
        const { title, description, dueDate, status } = req.body;
        const task = new Task({ title, description, dueDate, status });
        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(400).json({ error: 'Failed to create task', details: error });
    }
};

// Get all tasks with pagination and search
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(201).json({
            "success": true,
            "message": "task fetched Successfully",
            "task": tasks
        })
        // console.log(res.task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks', details: error });
    }
    
};

// Get a single task by ID
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch task', details: error });
    }
};

// Update a task by ID
const updateTask = async (req, res) => {
    console.log(req.body);

    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', updatedTask });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update task', details: error });
    }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully', deletedTask });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task', details: error });
    }
};

module.exports = {
    createTask,
    getTaskById,
    getTasks,
    deleteTask,
    updateTask
}
