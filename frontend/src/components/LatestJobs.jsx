import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
//const randomJob = [1, 2, 3, 4, 5, 6, 7, 8];
function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold ">
        <span className="text-[#6A38C2]"> Latest & Top </span>Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {/* multiple job cards displayed */}
        {allJobs.length > 0 ? (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCard key={job._id} job={job} />)
        ) : (
          <span>No recent Jobs</span>
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
