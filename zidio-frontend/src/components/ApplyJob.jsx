import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ApplyJob() {
  const { jobId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleApply = () => {
    if (!user) {
      alert("Please login first!");
      return;
    }
    axios.post(`/api/applications/apply?jobId=${jobId}`, null, { 
      headers: { "X-USER-ID": user.id },
      })
      .then(() => alert("Application submitted!"))
      .catch(() => alert("Error applying for job"));
  };

  return (
    <div>
      <h2>Apply for Job #{jobId}</h2>
      <button onClick={handleApply}>Apply</button>
    </div>
  );
}

export default ApplyJob;
