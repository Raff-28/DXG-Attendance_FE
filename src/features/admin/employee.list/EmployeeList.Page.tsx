import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WithTooltip } from "@/components/utility/WithTooltip";
import { accessTokenKey } from "@/constants/globals";
import {
  getEmployees,
  GetEmployeesResponseData,
} from "@/data/employee/employee.api";
import { AppResponse } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { CalendarDays, Trash2, UserRoundPen } from "lucide-react";

export const EmployeeListPage = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["employeeList"],
    queryFn: async () => {
      const token = Cookies.get(accessTokenKey);
      if (!token) {
        return Promise.resolve<AppResponse<GetEmployeesResponseData[]>>({
          data: [],
        });
      }
      return getEmployees(token);
    },
  });
  return (
    <div>
      <h1>Employee List</h1>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-6 py-3">Employee Name</TableHead>
            <TableHead className="px-6 py-3">Position</TableHead>
            <TableHead className="px-6 py-3">Department</TableHead>
            <TableHead className="px-6 py-3">Phone Number</TableHead>
            <TableHead className="px-6 py-3">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching && (
            <tr>
              <td colSpan={4}>Loading...</td>
            </tr>
          )}
          {!isFetching &&
            data?.data?.map((employee) => (
              <TableRow>
                <TableCell className="px-6 py-3">
                  {employee.full_name}
                </TableCell>
                <TableCell className="px-6 py-3">{employee.position}</TableCell>
                <TableCell className="px-6 py-3">
                  {employee.department}
                </TableCell>
                <TableCell className="px-6 py-3">
                  {employee.phone_number}
                </TableCell>
                <TableCell className="px-6 py-3">
                  <div className="flex gap-2">
                    <WithTooltip content="View attendance">
                      <button className="cursor-pointer text-blue-800 border-2 p-1 rounded-md border-blue-800 hover:bg-blue-800 hover:text-white transform hover:scale-110 transition-transform duration-200">
                        <CalendarDays size={20} />
                      </button>
                    </WithTooltip>
                    <WithTooltip content="Edit employee">
                      <button className="cursor-pointer text-yellow-600 border-2 p-1 rounded-md border-yellow-600 hover:bg-yellow-600 hover:text-white transform hover:scale-110 transition-transform duration-200">
                        <UserRoundPen size={20} />
                      </button>
                    </WithTooltip>
                    <WithTooltip content="Delete employee">
                      <button className="cursor-pointer text-red-800 border-2 p-1 rounded-md border-red-800 hover:bg-red-800 hover:text-white transform hover:scale-110 transition-transform duration-200">
                        <Trash2 size={20} />
                      </button>
                    </WithTooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
