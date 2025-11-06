import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("/api/jobs/all")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error loading jobs:", err));
  }, []);

  return (
    <center>
    <div>
      <h2>Job Listings</h2>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <strong>{job.title}</strong> – {job.company} ({job.location})
              <br />
              <Link to={`/apply/${job.id}`}>Apply</Link><br></br>
            </li>
          ))}
        </ul>
      )}
    </div>
    </center>
  );
}

export default JobList;
