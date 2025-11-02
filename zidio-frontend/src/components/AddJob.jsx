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
    axios
      .post("http://localhost:8080/api/jobs/add", job)
      .then(() => alert("Job added successfully!"))
      .catch(() => alert("Error adding job."));
  };

  return (
    <div>
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} /><br />
        <input name="company" placeholder="Company" onChange={handleChange} /><br />
        <input name="location" placeholder="Location" onChange={handleChange} /><br />
        <input name="description" placeholder="Description" onChange={handleChange} /><br />
        <input name="type" placeholder="Type" onChange={handleChange} /><br />
        <input name="salary" placeholder="Salary" onChange={handleChange} /><br />
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default AddJob;
