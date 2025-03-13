import { AppButton } from "@/components/appButton/AppButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/globals";
import { postRegister } from "@/data/auth/register.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { employeeRegistrationSchema } from "./employeeRegistration.schema";

export const EmployeeRegistrationForm = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: postRegister,
    onSuccess: (data) => {
      if (data.data) {
        navigate(ROUTES.EMPLOYEE_LIST);
      }
    },
  });

  const form = useForm<z.infer<typeof employeeRegistrationSchema>>({
    resolver: zodResolver(employeeRegistrationSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      position: "",
      department: "",
      phoneNumber: "",
    },
    mode: "onTouched",
  });

  const onSubmit = (values: z.infer<typeof employeeRegistrationSchema>) => {
    const formattedValues = {
      email: values.email,
      password: values.password,
      name: values.fullName,
      position: values.position,
      department: values.department,
      phone_number: values.phoneNumber,
    };
    mutateAsync(formattedValues);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 m-5"
      >
        <h1 className="text-2xl">Register a new Employee</h1>
        {renderEmployeeDataForm(form)}
        {renderEmployeeCredentialsForm(form)}
        <div className="flex flex-col w-[25%] self-end">
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
            loadingText="Registering..."
          >
            Submit Employee
          </AppButton>
          {data?.message && (
            <p className="text-red-500 self-center mt-2">{data.message}</p>
          )}
        </div>
      </form>
    </Form>
  );
};

const renderEmployeeCredentialsForm = (
  form: UseFormReturn<z.infer<typeof employeeRegistrationSchema>>
) => {
  return (
    <div className="border border-gray-300 rounded-md">
      <h2 className="text-xl w-full px-6 py-4 bg-gray-200 rounded-tl-md rounded-tr-md">
        Employee's user credential<span className="text-red-600">*</span>
      </h2>
      <div className="grid grid-cols-2 gap-6 items-start ms-1 py-5 px-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Employee's email"
                    required
                    className={`${
                      form.formState.errors.email && `border-red-500`
                    }`}
                    {...field}
                  />
                </FormControl>
                <div className="text-sm font-medium">
                  <p className="text-red-500">
                    {form.formState.errors.email?.message}
                  </p>
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Employee's password"
                    required
                    className={`${
                      form.formState.errors.password && `border-red-500`
                    }`}
                    {...field}
                  />
                </FormControl>
                <div className="text-sm font-medium">
                  <p className="text-red-500">
                    {form.formState.errors.password?.message}
                  </p>
                </div>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

const renderEmployeeDataForm = (
  form: UseFormReturn<z.infer<typeof employeeRegistrationSchema>>
) => {
  return (
    <div className="border border-gray-300 rounded-md">
      <h2 className="text-xl w-full px-6 py-4 bg-gray-200 rounded-tl-md rounded-tr-md">
        Employee's data<span className="text-red-600">*</span>
      </h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 items-start ms-1 py-5 px-5">
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
      </div>
    </div>
  );
};
