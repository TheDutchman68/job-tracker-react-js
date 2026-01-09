import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import JobList from "./components/JobList";



function App() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Applied');

  const addJob = () => {
    if (!company || !position) return;

    const newJob = {
      id: Date.now(),
      company,
      position,
      status,
    };

    setJobs([...jobs, newJob]);

    setCompany('');
    setPosition('');
    setStatus('Applied');
  }

     const deleteJob = (id) => {
      setJobs(jobs.filter((job) => job.id !== id));
    }

    const updateStatus = (id, newStatus) => {

      setJobs(jobs.map((job) => job.id === id ? { ...job, status: newStatus} : job ));
    };

    
  return (
    <div>
      <h1>Job Tracker</h1>
      <input type="text" placeholder='Company' value={company} onChange={(e) => setCompany(e.target.value)}></input>
      <input type='text' placeholder='Position' value={position} onChange={(e) => setPosition(e.target.value)}></input>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button onClick={addJob}>Add Job</button>
       <JobList
        jobs={jobs}
        deleteJob={deleteJob}
        updateStatus={updateStatus}
      />
    </div>
  );
}

export default App;
