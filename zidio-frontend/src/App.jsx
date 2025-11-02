import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import JobList from "./components/JobList";
import ApplyJob from "./components/ApplyJob";
import Login from "./components/Login";
import Register from "./components/Register";
import AddJob from "./components/AddJob";

function App() {
  return (
    <Router>
      <div>
        <h1>Zidio Connect</h1>
        <nav>
          <Link to="/jobs">Jobs</Link> |{" "}
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link> |{" "}
          <Link to="/add-job">Add Job</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/jobs" element={<JobList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/apply/:jobId" element={<ApplyJob />} />
          <Route path="/add-job" element={<AddJob />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
