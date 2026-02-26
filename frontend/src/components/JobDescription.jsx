import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";

import {
  JOB_API_END_POINT,
  APPLICATION_API_END_POINT,
} from "../utils/constant";
import { setSingleJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";

function JobDescription() {
  const params = useParams();
  const jobId = params.id;

  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  //console.log(user);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id,
            ),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id,
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  useEffect(() => {
    setIsApplied(isIntiallyApplied);
  }, [isIntiallyApplied]);

  const jobApplyHandler = async () => {
    try {
      //console.log("Applications:", singleJob?.applications);
      //console.log("User ID:", user?._id);

      setLoading(true);

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        {
          withCredentials: true,
        },
      );
      if (res.data?.success) {
        toast.success(res.data.message);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        //setIsApplied(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setIsApplied(true);
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">
              {singleJob?.title}
              {user?._id}
            </h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge className="text-blue-700 front-bold " variant="ghost">
                {singleJob?.position}
              </Badge>
              <Badge className="text-[#F83002] front-bold " variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-[#7209b7] front-bold " variant="ghost">
                {singleJob?.salary}
              </Badge>
            </div>
          </div>
          {/* {
          <Button
            disabled={isApplied}
            className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ed]"}`}
          >
            {!isApplied ? "Apply No" : "Already Applied"}
          </Button>
        } */}
          {loading ? (
            <Button>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Please Wait
            </Button>
          ) : (
            <Button
              onClick={jobApplyHandler}
              disabled={isApplied || loading}
              className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ed] cursor-pointer"}`}
            >
              {!isApplied ? "Apply Now" : "Already Applied"}
            </Button>
          )}
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          {singleJob?.description}
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1 ">
            Role :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Location :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Description :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Experience :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel} Years
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Salary :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary}K
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Total Applicants :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Posted Date :
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
