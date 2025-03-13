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

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Employee Name
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isFetching && (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            )}
            {!isFetching &&
              data?.data?.map((employee) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {employee.full_name}
                  </th>
                  <td className="px-6 py-4">{employee.position}</td>
                  <td className="px-6 py-4">{employee.department}</td>
                  <td className="px-6 py-4">{employee.phone_number}</td>
                  <td className="px-6 py-4">
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
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
