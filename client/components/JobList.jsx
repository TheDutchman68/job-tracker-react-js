import JobItem from "./JobItem";

function JobList({ jobs = [], deleteJob, updateStatus }) {
  return (
    <job-list>
      {jobs.map((job) => (
        <JobItem
          key={job._id || job.id}
          job={job}
          deleteJob={deleteJob}
          updateStatus={updateStatus}
        />
      ))}
    </job-list>
  );
}

export default JobList;
