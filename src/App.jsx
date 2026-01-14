import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import JobList from "./components/JobList";



function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('applied');
  const [error,setError] = useState('');
  const [success, setSuccess] = useState('');
  const companyRef = useRef(null);
  useEffect(() => {localStorage.setItem("jobs", JSON.stringify(jobs));},[jobs]);
  useEffect(() =>{
    companyRef.current.focus();
  },[]);

  const addJob = () => {
    if (!company.trim() || !position.trim()) {
      setError('All fields must be completed');
      setSuccess('');
      return;
    }

    const newJob = {
      id: Date.now(),
      company,
      position,
      status,
    };

    setJobs([...jobs, newJob]);

    setCompany('');
    setPosition('');
    setStatus('applied');
    setError('');
    setSuccess('Job added successfully!');
    companyRef.current.focus();

    setTimeout(() =>{
      setSuccess('');
    }, 2000)
  }

     const deleteJob = (id) => {
      setJobs(jobs.filter((job) => job.id !== id));
    }

    const updateStatus = (id, newStatus) => {

      setJobs(jobs.map((job) => job.id === id ? { ...job, status: newStatus} : job ));
    };

    
  return (
  <div className="app">
    <h1>Job Tracker</h1>

    <div className="form">
      <input
        ref={companyRef}
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
      </select>

      <button onClick={addJob}>Add Job</button>
      
    </div>
    {error && <p className='error'>{error}</p>}
    {success && <p className='success'>{success}</p>}
    <JobList
      jobs={jobs}
      deleteJob={deleteJob}
      updateStatus={updateStatus}
    />
  </div>
);

}

export default App;
