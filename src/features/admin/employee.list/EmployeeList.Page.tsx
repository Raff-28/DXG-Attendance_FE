import { DeleteEmployeeDialog } from "@/components/dialog/DeleteEmployee.Dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WithTooltip } from "@/components/utility/WithTooltip";
import { ACCESS_TOKEN_KEY, ROUTES } from "@/constants/globals";
import {
  deleteEmployee,
  GetEmployeeResponseData,
  getEmployees,
} from "@/data/employee/employee.api";
import { AppResponse } from "@/types/global";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Info, Trash2, UserRoundPen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { EditEmployeeDialog } from "./components/EditEmployee.Dialog";

export const EmployeeListPage = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["employeeList"],
    queryFn: async () => {
      const token = Cookies.get(ACCESS_TOKEN_KEY);
      if (!token) {
        return Promise.resolve<AppResponse<GetEmployeeResponseData[]>>({
          data: [],
        });
      }
      return getEmployees(token);
    },
  });

  return (
    <main className="flex flex-col gap-4 p-5">
      <h1 className="text-2xl">List of Employees</h1>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-6 py-3">Employee Name</TableHead>
            <TableHead className="px-6 py-3">Position</TableHead>
            <TableHead className="px-6 py-3">Department</TableHead>
            <TableHead className="px-6 py-3">Email</TableHead>
            <TableHead className="px-6 py-3">Phone Number</TableHead>
            <TableHead className="px-6 py-3 flex justify-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching && (
            <tr>
              <td colSpan={4} className="text-xl py-3 px-6">
                Loading...
              </td>
            </tr>
          )}
          {!isFetching && data?.data?.length === 0 && (
            <tr>
              <td colSpan={4} className="text-xl py-3 px-6">
                No employees found
              </td>
            </tr>
          )}
          {!isFetching &&
            data?.data?.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="px-6 py-3">
                  {employee.full_name}
                </TableCell>
                <TableCell className="px-6 py-3">{employee.position}</TableCell>
                <TableCell className="px-6 py-3">
                  {employee.department}
                </TableCell>
                <TableCell className="px-6 py-3">{employee.email}</TableCell>
                <TableCell className="px-6 py-3">
                  {employee.phone_number}
                </TableCell>
                <TableCell className="px-6 py-3 flex justify-center">
                  <div className="flex gap-2">
                    <WithTooltip content="View details">
                      <Link to={`${ROUTES.EMPLOYEE_DETAIL}/${employee.id}`}>
                        <div className="cursor-pointer text-blue-800 border-2 p-1 rounded-md border-blue-800 hover:bg-blue-800 hover:text-white transform hover:scale-110 transition-transform duration-200">
                          <Info size={20} />
                        </div>
                      </Link>
                    </WithTooltip>
                    <EditEmployeeButton prevData={employee} />
                    <DeleteEmployeeButton id={employee.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </main>
  );
};

const DeleteEmployeeButton = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const { mutateAsync: mutateDeleteEmployee } = useMutation({
    mutationFn: (id: number) => {
      const token = Cookies.get(ACCESS_TOKEN_KEY);
      if (!token) {
        return Promise.resolve<AppResponse<void>>({
          message: "Unauthorized",
        });
      }
      return deleteEmployee(id, token);
    },
    onSuccess: (data) => {
      if (!data.message) {
        setIsDeleteModalOpen(false);
        toast("Employee deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["employeeList"] });
      }
    },
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <>
      {isDeleteModalOpen && (
        <DeleteEmployeeDialog
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          onConfirmDelete={() => {
            mutateDeleteEmployee(id);
          }}
        />
      )}
      <WithTooltip content="Delete employee">
        <div
          onClick={() => {
            setIsDeleteModalOpen(true);
          }}
          className="cursor-pointer text-red-800 border-2 p-1 rounded-md border-red-800 hover:bg-red-800 hover:text-white transform hover:scale-110 transition-transform duration-200"
        >
          <Trash2 size={20} />
        </div>
      </WithTooltip>
    </>
  );
};

function EditEmployeeButton({
  prevData,
}: {
  prevData: GetEmployeeResponseData;
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <>
      {isEditModalOpen && (
        <EditEmployeeDialog
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          prevData={prevData}
          onSuccessEdit={() => {
            setIsEditModalOpen(false);
          }}
        />
      )}
      <WithTooltip content="Edit employee">
        <div
          onClick={() => {
            setIsEditModalOpen(true);
          }}
          className="cursor-pointer text-yellow-600 border-2 p-1 rounded-md border-yellow-600 hover:bg-yellow-600 hover:text-white transform hover:scale-110 transition-transform duration-200"
        >
          <UserRoundPen size={20} />
        </div>
      </WithTooltip>
    </>
  );
}
