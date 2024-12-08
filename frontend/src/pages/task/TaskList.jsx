import React, { useEffect, useState } from 'react';
import { getAllTask } from '../../apis/Api';
import TaskItem from './TaskItem';


const TaskList = () => {
    const [tasks, setTasks] = useState([]); // Initialize as an empty array

    useEffect(() => {
        getAllTask()
            .then((res) => {
                // Check if res.data.task exists and is an array
                if (Array.isArray(res.data.task)) {
                    console.log("Fetched tasks:", res.data.task);
                    setTasks(res.data.task); // Use res.data.task to set tasks state
                } else {
                    console.error('Invalid response structure:', res);
                    setTasks([]); // Set empty array if response is invalid
                }
            })
            .catch((error) => {
                console.log('Error fetching tasks:', error);
                setTasks([]); // Set empty array on error
            });
    }, []); // Empty dependency array to run this effect only once

    return (
        <div className="task-list-container">
            <h2>Tasks</h2>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <TaskItem key={task._id} task={task} />
                ))
            ) : (
                <p>No tasks available.</p>
            )}
        </div>
    );
};



export default TaskList;
