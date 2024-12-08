import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import './App.css';
import TaskForm from "./pages/task/TaskForm";
import TaskList from "./pages/task/TaskList";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
function App() {
  return (<>
    <Router>
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
