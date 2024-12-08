import React, { useState } from 'react';
import { toast } from "react-toastify";
import { deleteTask, updateTaskStatus } from "../../apis/Api"; // Assuming you have an updateTaskStatus API function

const TaskItem = ({ task }) => {
    const [status, setStatus] = useState(task.status); // Store the task status in the state
    const [title, setTitle] = useState(task.title); // Store the task title in the state
    const [description, setDescription] = useState(task.description); // Store the task description in the state
    const [dueDate, setDueDate] = useState(task.dueDate); // Store the task due date in the state

    const handleDelete = (id) => {
        const confirmDialog = window.confirm("Are you sure you want to delete?");
        if (confirmDialog) {
            deleteTask(id)
                .then((res) => {
                    if (res.status === 201) {
                        toast.success(res.data.message);
                        // reload
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    if (error.response.status === 500) {
                        toast.error(error.response.data.message);
                    }
                });
        }
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value); // Update the state with the selected status
    };

    const markAsCompleted = async () => {
        try {
            // Send the updated task with title, description, dueDate, and status
            await updateTaskStatus(task._id, { status: status, title, description, dueDate });
            setStatus(status); // Update the state locally
            toast.success("Task marked as completed!");
        } catch (err) {
            console.log('Error updating task:', err);
            toast.error("Error updating task status.");
        }
    };

    return (
        <div className="task-card">
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>
            <p className="task-due-date">Due Date: {new Date(task.dueDate).toLocaleString()}</p>

            {/* Dropdown for status */}
            <div className="task-status">
                <label>Status: </label>
                <select value={status} onChange={handleStatusChange}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <button onClick={markAsCompleted}>Mark as Completed</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
    );
};

export default TaskItem;
