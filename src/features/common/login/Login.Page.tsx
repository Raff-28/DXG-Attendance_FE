import { postLoginAndGetCredentials } from "@/data/auth/login.api";
import { useMutation } from "@tanstack/react-query";

export const LoginPage = () => {
  const { mutateAsync, isPending, isSuccess, data } = useMutation({
    mutationFn: postLoginAndGetCredentials,
  });
  return (
    <div>
      <h1 className="text-5xl">Login</h1>
    </div>
  );
};
