import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { setAllAppliedJobs } from "../../redux/jobSlice";
const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log(res.data.application);

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  });
};
export default useGetAppliedJobs;
