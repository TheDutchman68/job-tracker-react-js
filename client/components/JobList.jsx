import JobItem from "./JobItem";

function JobList({ jobs = [], deleteJob, updateStatus, deletingId }) {
  return (
    <job-list>
      {jobs.map((job) => (
        <JobItem
          key={job._id || job.id}
          job={job}
          deleteJob={deleteJob}
          updateStatus={updateStatus}
          deletingId={deletingId}
        />
      ))}
    </job-list>
  );
}

export default JobList;
