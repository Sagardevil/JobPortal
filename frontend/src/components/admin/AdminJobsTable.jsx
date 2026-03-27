import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminJobsTable() {
  const navigate = useNavigate();
  const { allAdminJobs } = useSelector((store) => store.job);
  const { searchJobByText } = useSelector((store) => store?.job);
  const [filteredJobs, setFilteredJobs] = useState(allAdminJobs);
  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilteredJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>A List of your recent registered companies</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't registered any jobs yet
              </TableCell>
            </TableRow>
          ) : (
            filteredJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>

                <TableCell>{job.title}</TableCell>

                <TableCell>{job.createdAt?.split("T")[0]}</TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      <div
                        className="flex items-center gap-2 w-fit cursor-pointer"
                        onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
