import React, { useState } from "react";
import axios from "axios";

function AddJob() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    type: "",
    salary: "",
    recruiterId: 1,
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/jobs/add", job)
      .then(() => alert("Job added successfully!"))
      .catch(() => alert("⚠️ Error adding job."));
  };

  return (

    <center>
    <div>
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} /><br /><br />
        <input name="company" placeholder="Company" onChange={handleChange} /><br /><br />
        <input name="location" placeholder="Location" onChange={handleChange} /><br /><br />
        <input name="description" placeholder="Description" onChange={handleChange} /><br /><br />
        <input name="type" placeholder="Type" onChange={handleChange} /><br /><br />
        <input name="salary" placeholder="Salary" onChange={handleChange} /><br /><br />
        <button type="submit">Add Job</button>
      </form>
    </div>
    </center>
  );
}

export default AddJob;
