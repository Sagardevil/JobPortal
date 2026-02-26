import React from "react";
import { Badge } from "./ui/badge";
function LatestJobCard({ job }) {
  console.log(job);
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-small text-gray-500">{job?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 front-bold " variant="ghost">
          Positions : {job?.position}
        </Badge>
        <Badge className="text-[#F83002] front-bold " variant="ghost">
          Job Type : {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] front-bold " variant="ghost">
          Salary : {job?.salary}K
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCard;
