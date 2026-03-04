import React, { useEffect } from "react";
import NavBar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applicationSlice";
import { toast } from "sonner";
import axios from "axios";

function Applicants() {
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const params = useParams();
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true },
        );
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
          //toast.success("sdjkf");
        }
      } catch (error) {
        toast.error(
          error.response.data.message || "Failed to fetch applicants",
        );
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, []);
  return (
    <>
      <NavBar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length}
        </h1>
        <ApplicantsTable />
      </div>
    </>
  );
}

export default Applicants;
