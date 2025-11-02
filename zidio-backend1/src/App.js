import React, {useState, useEffect} from "react";

const API = "http://localhost:8080/api";

function App(){
  const [user, setUser] = useState(null); // logged in user object
  const [jobs, setJobs] = useState([]);

  useEffect(()=>{ fetchJobs(); },[]);

  async function fetchJobs(){
    const res = await fetch(API + "/jobs");
    setJobs(await res.json());
  }

  async function register(e){
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.target));
    const res = await fetch(API + "/auth/register", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok) { alert("Registered"); setUser(data); }
    else alert(data);
  }

  async function login(e){
    e.preventDefault();
    const {email, password} = Object.fromEntries(new FormData(e.target));
    const res = await fetch(API + "/auth/login", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({email, password})
    });
    if (res.ok){
      const u = await res.json();
      setUser(u);
      alert("Logged in as " + u.name);
    } else {
      alert("Login failed");
    }
  }

  async function apply(jobId){
    if (!user) return alert("Login first");
    const res = await fetch(API + `/applications/apply?jobId=${jobId}`, {
      method: "POST",
      headers: {"X-USER-ID": user.id}
    });
    if (res.ok) {
      const app = await res.json();
      alert("Applied: " + app.id);
    } else alert("Apply failed");
  }

  async function postJob(e){
    e.preventDefault();
    if (!user) return alert("Login as recruiter");
    const form = Object.fromEntries(new FormData(e.target));
    form.recruiterId = user.id;
    form.postedByName = user.name;
    const res = await fetch(API + "/jobs", {
      method: "POST",
      headers: {"Content-Type":"application/json", "X-USER-ID": user.id},
      body: JSON.stringify(form)
    });
    if (res.ok){ fetchJobs(); alert("Job posted"); }
    else alert("Post failed");
  }

  return (
    <div style={{padding:20}}>
      <h1>Zidio Connect — Demo</h1>

      {!user && (
        <>
          <h3>Register</h3>
          <form onSubmit={register}>
            <input name="name" placeholder="Name" required/>
            <input name="email" placeholder="Email" required/>
            <input name="password" placeholder="Password" required/>
            <select name="role">
              <option value="STUDENT">Student</option>
              <option value="RECRUITER">Recruiter</option>
              <option value="ADMIN">Admin</option>
            </select>
            <button>Register</button>
          </form>

          <h3>Login</h3>
          <form onSubmit={login}>
            <input name="email" placeholder="Email" required/>
            <input name="password" placeholder="Password" required/>
            <button>Login</button>
          </form>
        </>
      )}

      {user && (
        <div>
          <p>Welcome, {user.name} ({user.role}) <button onClick={()=>setUser(null)}>Logout</button></p>

          {user.role === "RECRUITER" && (
            <div>
              <h3>Post Job</h3>
              <form onSubmit={postJob}>
                <input name="title" placeholder="Job title" required/>
                <input name="location" placeholder="Location" />
                <input name="type" placeholder="type" />
                <textarea name="description" placeholder="Description" />
                <button>Post</button>
              </form>
            </div>
          )}
        </div>
      )}

      <h2>Jobs</h2>
      <ul>
        {jobs.map(j => (
          <li key={j.id}>
            <b>{j.title}</b> — {j.location} — {j.type}
            <div>{j.description}</div>
            <button onClick={()=>apply(j.id)}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
