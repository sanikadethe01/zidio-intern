import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import JobList from "./components/JobList";
import ApplyJob from "./components/ApplyJob";
import AddJob from "./components/AddJob";

function App() {
  return (
    <Router>
      <center>
      <div>
        <h1>Zidio Connect</h1>
        <nav>
          <Link to="/register">Register</Link> |{" "}
          <Link to="/login">Login</Link> |{" "}
          <Link to="/jobs">Jobs</Link> |{" "}
          <Link to="/add-job">Add Job</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<JobList />} />          
          <Route path="/apply/:jobId" element={<ApplyJob />} />
          <Route path="/add-job" element={<AddJob />} />
        </Routes>
      </div>
      </center>
    </Router>
  );
}

export default App;
