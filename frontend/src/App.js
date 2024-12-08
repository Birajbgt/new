import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import './App.css';
import Navbar from "./coponent/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import TaskForm from "./pages/task/TaskForm";
import TaskList from "./pages/task/TaskList";
function App() {
  return (<>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='' element={<TaskForm />} />
        <Route path='/task' element={<TaskList />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
