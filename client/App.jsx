import { useState, useEffect, useRef } from 'react';
import JobList from "./components/JobList";
import Login from './pages/Login';
import Register from './pages/Register';
import Header from "./components/Header";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('applied');
  const [error,setError] = useState('');
  const [success, setSuccess] = useState('');
  const errorTimeoutRef = useRef(null);
  const successTimeoutRef = useRef(null);
  const companyRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  
  
  useEffect(() => {
  if (!isAuth) return;

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/jobs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      setJobs(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchJobs();
}, [isAuth]);


  const addJob = async () => {
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

    try {
    const response = await fetch('http://localhost:5001/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ company, position, status }),
    });

    const data = await response.json();

    setJobs([...jobs, data.data]);
    
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
  }catch(error) {
    console.log(error)
  }

  }

    const deleteJob = async (id) => {
       try {
      await fetch(`http://localhost:5001/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

        setJobs(jobs.filter((job) => job._id !== id));
      } catch (error) {
        console.log(error);
  }
};  


      const updateStatus = async (id, newStatus) => {
      try {
        const response = await fetch(`http://localhost:5001/api/jobs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      setJobs(jobs.map((job) =>job._id === id ? data.data : job));
      } catch (error) {
      console.log(error);
      }
};
  
  if (!isAuth) {
  return showRegister ? (
    <Register setShowRegister={setShowRegister} />
  ) : (
    <Login setIsAuth={setIsAuth} setShowRegister={setShowRegister} />
  );
}

  return (
    
  <div className="app">
    <Header setIsAuth={setIsAuth} />
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
