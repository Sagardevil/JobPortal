import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
function Job({ job }) {
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (100 * 24 * 60 * 60));
  };
  console.log(job?.createdAt);

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 ">
          {daysAgoFunction(job.createdAt) == 0
            ? "Today"
            : `${daysAgoFunction(job.createdAt)} Days Ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline">
          <Avatar>
            <AvatarImage src="https://tse1.mm.bing.net/th/id/OIP.4rZ4ZPxFnT6vMCad7bnPugHaHa?pid=Api&P=0&h=220" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg ">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 front-bold " variant="ghost">
          {job?.position}
        </Badge>
        <Badge className="text-[#F83002] front-bold " variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] front-bold " variant="ghost">
          {job?.salary}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
        <Button variant="" className="bg-[#7209b7]">
          Save for later
        </Button>
      </div>
    </div>
  );
}

export default Job;
