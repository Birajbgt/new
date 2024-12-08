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
                toast.success(res.data.message);
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
        <div className="container-fluid full-page">
            <div className="row h-100">
                <div className="col-md-3 col-lg-3 d-flex justify-content-center align-items-center">
                    <div className="card card-form border-0 shadow">
                        <div className="card-header bg-white">
                            <h1 className="fs-5 text-dark m-0 text-decoration-underline w-100 text-center">
                                Create a New Task
                            </h1>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Task Title</label>
                                    <input
                                        type="text"
                                        placeholder="Enter task title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Description</label>
                                    <textarea
                                        placeholder="Enter task description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Due Date</label>
                                    <input
                                        type="datetime-local"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                {error && <p className="text-danger mt-2">{error}</p>}
                            </form>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                Create Task
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    {/* Placeholder for task list or additional content */}
                </div>
            </div>
        </div>
    );
};

export default TaskForm;
