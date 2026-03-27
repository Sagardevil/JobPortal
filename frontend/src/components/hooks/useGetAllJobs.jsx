import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/constant";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../../redux/jobSlice";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const {searchQuery}=useSelector((state)=>state.job);
  
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    };
    fetchAllJobs();
  }, [searchQuery,dispatch]);
}

export default useGetAllJobs;
