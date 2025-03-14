import { ACCESS_TOKEN_KEY, ROUTES } from "@/constants/globals";
import { getCredentials } from "@/data/auth/credentials.api";
import { Role } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RequireRoleProps {
  role: Role[];
  children: ReactNode;
}

export const RequireRole = (props: RequireRoleProps) => {
  const { data, isFetching } = useQuery({
    queryKey: ["userCredentials"],
    queryFn: async () => {
      const token = Cookies.get(ACCESS_TOKEN_KEY);
      if (!token) {
        return Promise.resolve({
          data: { id: 0, role: "guest" as Role },
        });
      }
      return getCredentials(token);
    },
  });

  if (isFetching || !data?.data) {
    return <div>Loading...</div>;
  }

  if (!props.role.includes(data.data.role)) {
    if (data.data.role == "employee") {
      return <Navigate to={ROUTES.SUBMIT_ATTENDANCE} replace />;
    }
    if (data.data.role == "admin") {
      return <Navigate to={ROUTES.EMPLOYEE_LIST} replace />;
    }
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return props.children;
};
