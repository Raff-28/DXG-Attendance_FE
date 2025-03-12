import { Role } from "@/types/global";
import { ReactNode, useMemo } from "react";
import { Navigate } from "react-router-dom";

interface RequireRoleProps {
  role: Role[];
  redirectRoute?: string;
  children: ReactNode;
}

export const RequireRole = (props: RequireRoleProps) => {
  const userRole: Role = useMemo(() => "guest", []); // TODO: change with actual logic to get user role later

  if (!props.role.includes(userRole)) {
    if (props.redirectRoute !== undefined) {
      return <Navigate to={props.redirectRoute} replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return props.children;
};
