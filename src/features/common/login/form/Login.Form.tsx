import { AppButton } from "@/components/appButton/AppButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { accessTokenKey, ROUTES } from "@/constants/globals";
import { postLoginAndGetCredentials } from "@/data/auth/login.api";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { loginSchema } from "./login.schema";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postLoginAndGetCredentials,
    onSuccess: (data) => {
      console.log(data);
      if (data.data) {
        Cookies.set(accessTokenKey, data.data.token, { expires: 1 });
        if (data.data.role === "admin") {
          navigate(ROUTES.EMPLOYEE_LIST, { replace: true });
        } else {
          navigate(ROUTES.SUBMIT_ATTENDANCE, { replace: true });
        }
      }
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutateAsync(values);
  };
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="text-black bg-white border border-gray-300">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to login to the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
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
                            placeholder="Enter your email here"
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
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password here"
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
                <AppButton
                  variant="default"
                  className="cursor-pointer"
                  state={
                    isPending
                      ? "Loading"
                      : form.formState.isValid
                      ? "Active"
                      : "Disabled"
                  }
                  loadingText="Authenticating..."
                >
                  Login
                </AppButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
