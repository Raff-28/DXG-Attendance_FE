import { EmployeeListRoute } from "@/features/admin/employee.list/EmployeeList.Route";
import { LoginRoute } from "@/features/common/login/Login.Route";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { lazy } from "react";

const AdminLayout = lazy(() => import("@/features/admin/Admin.Layout"));
// const EmployeeLayout = lazy(
//   () => import("@/features/employee/Employee.Layout")
// );

const router = createBrowserRouter([
  {
    element: <AdminLayout />,
    children: [EmployeeListRoute],
  },
  // {
  //   element: <EmployeeLayout />,
  //   children: [LoginRoute],
  // },
  LoginRoute,
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
