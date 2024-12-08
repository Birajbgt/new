// import React, { useEffect, useState } from 'react';
// import { getAllTask } from '../../apis/Api';
// import TaskItem from './TaskItem';

// const TaskList = () => {
//     const [tasks, setTasks] = useState([]); // Initialize as an empty array
//     const [searchQuery, setSearchQuery] = useState(""); // Store search query state
//     const [filteredTasks, setFilteredTasks] = useState([]); // Store filtered tasks
//     const [currentPage, setCurrentPage] = useState(1); // Store current page
//     const [tasksPerPage] = useState(2); // Number of tasks to display per page

//     useEffect(() => {
//         getAllTask()
//             .then((res) => {
//                 // Check if res.data.task exists and is an array
//                 if (Array.isArray(res.data.task)) {
//                     console.log("Fetched tasks:", res.data.task);
//                     setTasks(res.data.task); // Use res.data.task to set tasks state
//                     setFilteredTasks(res.data.task); // Set initial filtered tasks to all tasks
//                 } else {
//                     console.error('Invalid response structure:', res);
//                     setTasks([]); // Set empty array if response is invalid
//                     setFilteredTasks([]); // Set empty array for filtered tasks
//                 }
//             })
//             .catch((error) => {
//                 console.log('Error fetching tasks:', error);
//                 setTasks([]); // Set empty array on error
//                 setFilteredTasks([]); // Set empty array for filtered tasks
//             });
//     }, []); // Empty dependency array to run this effect only once

//     // Handle search input change
//     const handleSearch = (e) => {
//         const query = e.target.value.toLowerCase(); // Convert search query to lowercase
//         setSearchQuery(query); // Update search query state

//         // Filter tasks based on title or description match
//         const filtered = tasks.filter((task) =>
//             task.title.toLowerCase().includes(query) ||
//             task.description.toLowerCase().includes(query)
//         );
//         setFilteredTasks(filtered); // Update filtered tasks based on search query
//     };

//     // Get current tasks for the current page
//     const indexOfLastTask = currentPage * tasksPerPage;
//     const indexOfFirstTask = indexOfLastTask - tasksPerPage;
//     const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

//     // Change page
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     // Calculate total pages
//     const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

//     return (
//         <div className="task-list-container">
//             <h2>Tasks</h2>

//             {/* Search input */}
//             <div className="search-container">
//                 <input
//                     type="text"
//                     placeholder="Search tasks..."
//                     value={searchQuery}
//                     onChange={handleSearch}
//                     className="search-input"
//                 />
//             </div>

//             {currentTasks.length > 0 ? (
//                 currentTasks.map((task) => (
//                     <TaskItem key={task._id} task={task} />
//                 ))
//             ) : (
//                 <p>No tasks available.</p>
//             )}

//             {/* Pagination controls */}
//             {totalPages > 1 && (
//                 <div className="pagination">
//                     <button
//                         onClick={() => paginate(currentPage - 1)}
//                         disabled={currentPage === 1}
//                     >
//                         Prev
//                     </button>
//                     {Array.from({ length: totalPages }, (_, index) => (
//                         <button
//                             key={index + 1}
//                             onClick={() => paginate(index + 1)}
//                             className={index + 1 === currentPage ? 'active' : ''}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}
//                     <button
//                         onClick={() => paginate(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                     >
//                         Next
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TaskList;

import React, { useEffect, useState } from 'react';
import { getAllTask } from '../../apis/Api';
import './Style.css'; // Add your CSS styles here
import TaskItem from './TaskItem';

const Pagination = ({ currentPage, totalPages, paginate }) => {
    return (
        <div className='pagination-container'>
            <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            <span>Page</span>
            <input
                type='number'
                value={currentPage}
                onChange={(e) => paginate(Number(e.target.value))}
                min='1'
                max={totalPages}
                className='page-input'
            />
            <span>of {totalPages}</span>
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

const TaskList = () => {
    const [tasks, setTasks] = useState([]); // Initialize as an empty array
    const [searchQuery, setSearchQuery] = useState(""); // Store search query state
    const [filteredTasks, setFilteredTasks] = useState([]); // Store filtered tasks
    const [currentPage, setCurrentPage] = useState(1); // Store current page
    const tasksPerPage = 2; // Number of tasks to display per page

    useEffect(() => {
        getAllTask()
            .then((res) => {
                // Check if res.data.task exists and is an array
                if (Array.isArray(res.data.task)) {
                    console.log('Fetched tasks:', res.data.task);
                    setTasks(res.data.task); // Use res.data.task to set tasks state
                    setFilteredTasks(res.data.task); // Set initial filtered tasks to all tasks
                } else {
                    console.error('Invalid response structure:', res);
                    setTasks([]); // Set empty array if response is invalid
                    setFilteredTasks([]); // Set empty array for filtered tasks
                }
            })
            .catch((error) => {
                console.log('Error fetching tasks:', error);
                setTasks([]); // Set empty array on error
                setFilteredTasks([]); // Set empty array for filtered tasks
            });
    }, []); // Empty dependency array to run this effect only once

    // Handle search input change
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase(); // Convert search query to lowercase
        setSearchQuery(query); // Update search query state

        // Filter tasks based on title or description match
        const filtered = tasks.filter((task) =>
            task.title.toLowerCase().includes(query) ||
            task.description.toLowerCase().includes(query)
        );
        setFilteredTasks(filtered); // Update filtered tasks based on search query
    };

    // Get current tasks for the current page
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    return (
        <div className="task-list-container container">
            <h4>All Tasks</h4>

            {/* Search input */}
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={handleSearch}
                className="form-control mb-3"
            />

            {/* Task list */}
            <div className="row p-0 m-0">
                {currentTasks.length > 0 ? (
                    currentTasks.map((task) => (
                        <div key={task._id} className="col-12 col-sm-6 col-lg-4 col-xl-3 p-0 m-0">
                            <TaskItem task={task} />
                        </div>
                    ))
                ) : (
                    <div>No tasks available</div>
                )}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
            />
        </div>
    );
};

export default TaskList;
