import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/auth/login", form)
      .then((res) => {
        alert("Login successful!");
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch(() => alert("Invalid credentials"));
  };

  return (
    <center>
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} /><br /><br></br>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
    </center>
  );
}

export default Login;
