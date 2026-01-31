import { useState, useEffect, useRef } from 'react';
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
  const errorTimeoutRef = useRef(null);
  const successTimeoutRef = useRef(null);
  const companyRef = useRef(null);
  

  useEffect(() => {localStorage.setItem("jobs", JSON.stringify(jobs));},[jobs]);
  useEffect(() =>{
    companyRef.current.focus();
  },[]);

  const addJob = () => {
    const textOnlyRegex = /^[A-Za-z\s]+$/;

  const isCompanyEmpty = !company.trim();
  const isPositionEmpty = !position.trim();

  const isCompanyInvalid = company.trim() && !textOnlyRegex.test(company);
  const isPositionInvalid = position.trim() && !textOnlyRegex.test(position);

  // empty fields
  if (isCompanyEmpty || isPositionEmpty) {
    setError("All fields must be completed!");
    setSuccess("");
    clearTimeout(errorTimeoutRef.current);
    errorTimeoutRef.current = setTimeout(() => setError(""), 2000);
    return;
  }

  // both invalid
  if (isCompanyInvalid && isPositionInvalid) {
    setError("Company and position cannot contain numbers or special characters.");
    setSuccess("");
    clearTimeout(errorTimeoutRef.current);
    errorTimeoutRef.current = setTimeout(() => setError(""), 2000);
    return;
  }

  // only company invalid
  if (isCompanyInvalid) {
    setError("Company name cannot contain numbers or special characters.");
    setSuccess("");
    clearTimeout(errorTimeoutRef.current);
    errorTimeoutRef.current = setTimeout(() => setError(""), 2000);
    return;
  }

  // only position invalid
  if (isPositionInvalid) {
    setError("Position cannot contain numbers or special characters.");
    setSuccess("");
    clearTimeout(errorTimeoutRef.current);
    errorTimeoutRef.current = setTimeout(() => setError(""), 2000);
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

    clearTimeout(successTimeoutRef.current);
    successTimeoutRef.current = setTimeout(() => {
      setSuccess('');
    }, 2000);
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

    <JobList
      jobs={jobs}
      deleteJob={deleteJob}
      updateStatus={updateStatus}
    />
    <p className={`error ${error ? "show" : ""}`}>{error}</p>
    <p className={`success ${success ? "show" : ""}`}>{success}</p>
  </div>
);

}

export default App;
