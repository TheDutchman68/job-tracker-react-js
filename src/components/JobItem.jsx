function JobItem({ job, deleteJob, updateStatus }) {
  return (
    <li>
      {job.company} - {job.position}

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
    </li>
  );
}

export default JobItem;
