import { useState } from "react";

function JobItem({ job, deleteJob, updateStatus }) {

  const [isRemoving, setIsRemoving] = useState(false);

  const handleDelete = () => {
    setIsRemoving(true);

    setTimeout(() => {
      deleteJob(job.id);
    }, 300)
  }


  return (
    <li className={`job-item ${isRemoving ? "removing" : ""}`}>
      <div className="job-info">
        <strong>{job.company}</strong>
        <span>{job.position}</span>
      </div>

      <div className="job-actions">
        <select
          value={job.status}
          onChange={(e) => updateStatus(job.id, e.target.value)}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="rejected">Rejected</option>
        </select>

        <button onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default JobItem;
