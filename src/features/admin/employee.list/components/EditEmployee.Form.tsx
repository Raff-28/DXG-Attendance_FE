import { AppButton } from "@/components/appButton/AppButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ACCESS_TOKEN_KEY } from "@/constants/globals";
import {
  GetEmployeeResponseData,
  putEmployee,
  PutEmployeeRequestBody,
} from "@/data/employee/employee.api";
import { AppResponse } from "@/types/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { editEmployeeSchema } from "../schemas/editEmployee.schema";

interface EditEmployeeFormProps {
  prevData: GetEmployeeResponseData;
  onSuccessEdit: () => void;
}

export const EditEmployeeForm = ({
  prevData,
  onSuccessEdit,
}: EditEmployeeFormProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: mutateEditEmployee, isPending } = useMutation({
    mutationFn: (body: PutEmployeeRequestBody) => {
      const token = Cookies.get(ACCESS_TOKEN_KEY);
      if (!token) {
        return Promise.resolve<AppResponse<void>>({
          message: "Unauthorized",
        });
      }
      return putEmployee(prevData.id, body, token);
    },
    onSuccess: (data) => {
      if (!data.message) {
        onSuccessEdit();
        queryClient.invalidateQueries({ queryKey: ["employeeList"] });
      }
    },
  });
  const form = useForm<z.infer<typeof editEmployeeSchema>>({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues: {
      fullName: prevData.full_name,
      position: prevData.position,
      department: prevData.department,
      phoneNumber: prevData.phone_number,
    },
    mode: "onTouched",
  });

  const onSubmitForm = (values: z.infer<typeof editEmployeeSchema>) => {
    const formattedValues: PutEmployeeRequestBody = {
      full_name: values.fullName,
      position: values.position,
      department: values.department,
      phone_number: values.phoneNumber,
    };
    mutateEditEmployee(formattedValues);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="flex flex-col gap-5"
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 items-start pt-2 px-5">
          <EditEmployeeFormFields form={form} />
        </div>
        <div className="flex flex-col w-[25%] self-end px-5 pb-5">
          <AppButton
            className="cursor-pointer"
            type="submit"
            state={
              isPending
                ? "Loading"
                : form.formState.isValid
                ? "Active"
                : "Disabled"
            }
            loadingText="Saving..."
          >
            Save Changes
          </AppButton>
        </div>
      </form>
    </Form>
  );
};

const EditEmployeeFormFields = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof editEmployeeSchema>>;
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <div className="grid gap-2">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Employee's full name"
                  required
                  className={`${
                    form.formState.errors.fullName && `border-red-500`
                  }`}
                  {...field}
                />
              </FormControl>
              <div className="text-sm font-medium">
                <p className="text-red-500">
                  {form.formState.errors.fullName?.message}
                </p>
              </div>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <div className="grid gap-2">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder="Employee's phone number"
                  required
                  className={`${
                    form.formState.errors.phoneNumber && `border-red-500`
                  }`}
                  {...field}
                />
              </FormControl>
              <div className="text-sm font-medium">
                <p className="text-red-500">
                  {form.formState.errors.phoneNumber?.message}
                </p>
              </div>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="position"
        render={({ field }) => (
          <FormItem>
            <div className="grid gap-2">
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input
                  id="position"
                  type="text"
                  placeholder="Employee's position"
                  required
                  className={`${
                    form.formState.errors.position && `border-red-500`
                  }`}
                  {...field}
                />
              </FormControl>
              <div className="text-sm font-medium">
                <p className="text-red-500">
                  {form.formState.errors.position?.message}
                </p>
              </div>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <div className="grid gap-2">
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input
                  id="department"
                  type="text"
                  placeholder="Employee's department"
                  required
                  className={`${
                    form.formState.errors.department && `border-red-500`
                  }`}
                  {...field}
                />
              </FormControl>
              <div className="text-sm font-medium">
                <p className="text-red-500">
                  {form.formState.errors.department?.message}
                </p>
              </div>
            </div>
          </FormItem>
        )}
      />
    </>
  );
};
