import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCompanies } from "../../redux/companySlice";

function useGetAllCompanies() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        //console.log("Hey");

        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        } else {
          console.log("Failed to fetch companies:", res.data.success);
        }
      } catch (error) {
        console.log("Error fetching companies:", error);
        console.log(error);
      }
    };
    fetchAllCompany();
  }, [dispatch]);
}

export default useGetAllCompanies;
