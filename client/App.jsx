import { useState, useEffect, useRef } from 'react';
import JobList from "./components/JobList";
import Login from './pages/Login';
import Register from './pages/Register';
import Header from "./components/Header";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('applied');
  const [error,setError] = useState('');
  const [success, setSuccess] = useState('');
  const errorTimeoutRef = useRef(null);
  const successTimeoutRef = useRef(null);
  const companyRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
  if (!isAuth) return;

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/api/jobs`, {
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

    setLoading(true);

    try {
    const response = await fetch(`${API_URL}/api/jobs`, {
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
    setError("Something went wrong")
  } finally{
    setLoading(false);
  }

  }

    const deleteJob = async (id) => {
        setDeletingId(id);
       try {
      await fetch(`${API_URL}/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

        setJobs(jobs.filter((job) => job._id !== id));
      } catch (error) {
        console.log(error);
      } finally{
        setDeletingId(null);
      }
};  


      const updateStatus = async (id, newStatus) => {
      try {
        const response = await fetch(`${API_URL}/api/jobs/${id}`, {
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
    
  <div className="job-app">
    <Header setIsAuth={setIsAuth} />
    <div className="job-form">
      <input
        disabled={loading}
        ref={companyRef}
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />

      <input
        disabled={loading}
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

      <button onClick={addJob} disabled={loading}>{loading ? (<><span className="spinner"></span> Adding...</>):("Add job")}</button>
      
    </div>

    <JobList
      jobs={jobs}
      deleteJob={deleteJob}
      updateStatus={updateStatus}
      deletingId={deletingId}
    />
    <p className={`job-error ${error ? "show" : ""}`}>{error}</p>
    <p className={`job-success ${success ? "show" : ""}`}>{success}</p>
  </div>
);

}

export default App;
