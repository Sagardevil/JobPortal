import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import useGetAllJobs from "./hooks/useGetAllJobs";
import {motion} from "framer-motion";
function Browse() {
  useGetAllJobs();
  const dispatch=useDispatch();
  const {allJobs}=useSelector((state)=>state.job);
  useEffect(()=>{
    return ()=>{
      dispatch(setSearchQuery(""));
    } 
  },[]
)
  return (
    <div>
      <Navbar />
      <motion.div className="max-w-7xl mx-auto my-10"
      initial={{opacity:0,x:100}}
      animate={{opacity:1,x:0}}
      transition={{duration:0.5}}
      >
        <h1 className="font-bold text-xl my-10">
          Search Results ({allJobs?.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {allJobs?.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default Browse;
