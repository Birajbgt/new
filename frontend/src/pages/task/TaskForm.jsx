import React, { useState } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import { createtask } from "../../apis/Api";

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Clear any previous error messages
        setError('');

        // Make an API call
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("dueDate", dueDate);

        try {
            const res = await createtask(formData);
            if (res.status === 201) {
                toast.success(res.data.message); // Show success toast
                setTitle('');
                setDescription('');
                setDueDate('');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.warning(error.response.data.message); // Warning toast
                } else if (error.response.status === 500) {
                    toast.error("Server error, please try again later!"); // Server error toast
                } else {
                    toast.error("Something went wrong!");
                }
            } else {
                toast.error("Network error, please try again later!");
            }
        }
    };

    return (
        <div className="task-form-container">
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit} className="task-form">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="task-input"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="task-textarea"
                />
                <input
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                    className="task-input"
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="task-submit-button">Create Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
