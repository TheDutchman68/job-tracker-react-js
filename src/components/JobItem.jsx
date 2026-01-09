function JobItem({ job, deleteJob, updateStatus }) {
  return (
    <li className="job-item">
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

        <button onClick={() => deleteJob(job.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default JobItem;
