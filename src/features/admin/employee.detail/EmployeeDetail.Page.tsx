import profilePlaceholder from "@/assets/profile-placeholder.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ACCESS_TOKEN_KEY, DEFAULT_PAGE_SIZE } from "@/constants/globals";
import {
  getAttendances,
  GetAttendancesResponseData,
} from "@/data/attendance/attendance.api";
import {
  getEmployeeDetails,
  GetEmployeeResponseData,
} from "@/data/employee/employee.api";
import { formatTimestamp } from "@/lib/utils";
import { AppResponse } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const EmployeeDetailPage = () => {
  const { id, userId } = useParams();
  const [page, setPage] = useState(1);
  const { data: employeeData } = useQuery({
    queryKey: ["employeeDetail", id],
    queryFn: async () => {
      const token = Cookies.get(ACCESS_TOKEN_KEY);
      if (!token) {
        return Promise.resolve<AppResponse<GetEmployeeResponseData>>({
          message: "No token found",
        });
      }
      if (id === undefined || isNaN(Number(id))) {
        return Promise.resolve<AppResponse<GetEmployeeResponseData>>({
          message: "Invalid id",
        });
      }
      return getEmployeeDetails(Number(id), token);
    },
  });

  const { data: attendanceData } = useQuery({
    queryKey: ["attendanceList", userId, page],
    queryFn: async () => {
      const token = Cookies.get(ACCESS_TOKEN_KEY);
      if (!token) {
        return Promise.resolve<AppResponse<GetAttendancesResponseData>>({
          message: "No token found",
        });
      }
      if (userId === undefined || isNaN(Number(userId))) {
        return Promise.resolve<AppResponse<GetAttendancesResponseData>>({
          message: "Invalid id",
        });
      }
      return getAttendances(Number(userId), token, {
        page_number: page,
        page_size: DEFAULT_PAGE_SIZE,
      });
    },
  });

  return (
    <main className="mt-4 flex flex-col gap-5 px-5">
      {renderEmployeeData(employeeData)}
      <div className="border rounded-lg shadow px-4 sm:px-6 py-5 mb-6">
        <h2 className="text-lg mb-4">Employee's WFH Attendance History</h2>
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="px-6 py-3">Date</TableHead>
              <TableHead className="px-6 py-3">Timestamp</TableHead>
              <TableHead className="px-6 py-3">Work Description</TableHead>
              <TableHead className="px-6 py-3">Reason for WFH</TableHead>
              <TableHead className="px-6 py-3 flex justify-center">
                Proof Image
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData?.data?.attendances.map((attendance) => (
              <TableRow key={attendance.id}>
                <TableCell className="px-6 py-3">
                  {new Date(attendance.timestamp).toDateString()}
                </TableCell>
                <TableCell className="px-6 py-3">
                  {formatTimestamp(attendance.timestamp)}
                </TableCell>
                <TableCell className="px-6 py-3 whitespace-normal">
                  {attendance.work_description}
                </TableCell>
                <TableCell className="px-6 py-3 whitespace-normal">
                  {attendance.reason_for_wfh}
                </TableCell>
                <TableCell className="px-6 py-3 flex justify-center">
                  <p className="cursor-pointer text-blue-600">🖼 Open</p>
                </TableCell>
              </TableRow>
            ))}
            🖼
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

const renderEmployeeData = (
  employeeData: AppResponse<GetEmployeeResponseData> | undefined
) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="bg-white overflow-hidden shadow rounded-lg border col-span-8">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Employee Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details & company-related information.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {employeeData?.data?.full_name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {employeeData?.data?.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Phone number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {employeeData?.data?.phone_number}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Position</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {employeeData?.data?.position}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Department</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {employeeData?.data?.department}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="col-span-4 border rounded-lg shadow">
        <img src={profilePlaceholder} className="" />
      </div>
    </div>
  );
};
