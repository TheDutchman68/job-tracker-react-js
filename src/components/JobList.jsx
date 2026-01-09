import JobItem from "./JobItem";

function JobList({ jobs, deleteJob, updateStatus }) {
  return (
    <ul>
      {jobs.map((job) => (
        <JobItem
          key={job.id}
          job={job}
          deleteJob={deleteJob}
          updateStatus={updateStatus}
        />
      ))}
    </ul>
  );
}

export default JobList;
