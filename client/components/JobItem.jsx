import { useState } from "react";

function JobItem({ job, deleteJob, updateStatus, deletingId }) {

  const [isRemoving, setIsRemoving] = useState(false);
  const isDeleting = deletingId === job._id;
  const handleDelete = () => {
    setIsRemoving(true);

    setTimeout(() => {
      deleteJob(job._id);
    }, 300)
  }


  return (
    <li className={`job-item ${isRemoving ? "removing" : ""}`}>
      <div className="job-info">
        <strong>{job.company}</strong>
        <span>{job.position}</span>
      </div>

      <div className="job-actions">
        <select value={job.status} onChange={(e) => updateStatus(job._id, e.target.value)}>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
        </select>

        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? (<><span className="spinner"></span> Deleting...</>) : ("Delete")}
        </button>
      </div>
    </li>
  );
}

export default JobItem;
