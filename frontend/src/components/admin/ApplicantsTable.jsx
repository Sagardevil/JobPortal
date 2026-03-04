import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);

  const shortListingStatus = ["Accepted", "Rejected"];

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast;
    }
  };
  return (
    <>
      <Table>
        <TableCaption>A List of Your Recent Applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email </TableHead>
            <TableHead>Contact No</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={"text-right"}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <tr key={item._id}>
              <TableCell>{item?.applicant?.fullname}</TableCell>
              <TableCell>{item?.applicant?.email}</TableCell>
              <TableCell>{item?.applicant?.phoneNumber}</TableCell>
              {item?.applicant?.profile?.resume ? (
                <a
                  href={item?.applicant?.profile?.resume}
                  target="_blank"
                  className="text-blue-600 cursor-pointer"
                >
                  {item?.applicant?.profile?.resumeOriginalName}
                </a>
              ) : (
                <>No resume</>
              )}
              <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
              <TableCell className="float-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className={"w-32"}>
                    {shortListingStatus.map((status, index) => {
                      return (
                        <div
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                          className="flex w-fit items-center cursor-pointer my-2"
                        >
                          <span>{status}</span>
                        </div>
                      );
                    })}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}

          {/* <tr>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>COntact</TableCell>
            <TableCell>Resume</TableCell>
            <TableCell>21-10-2025</TableCell>
            <TableCell className={"float-right cursor-pointer"}>
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className={"w-32"}>
                  {shortListingStatus.map((status, index) => {
                    return (
                      <div
                        key={index}
                        className="flex w-fit items-center cursor-pointer my-2"
                      >
                        <span>{status}</span>
                      </div>
                    );
                  })}
                </PopoverContent>
              </Popover>
            </TableCell>
          </tr> */}
        </TableBody>
      </Table>
    </>
  );
}

export default ApplicantsTable;
