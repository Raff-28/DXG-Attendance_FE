import { EmployeeListRoute } from "@/features/admin/employee.list/EmployeeList.Route";
import { LoginRoute } from "@/features/common/login/Login.Route";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { ROUTES } from "@/constants/globals";
import { EmployeeDetailRoute } from "@/features/admin/employee.detail/EmployeeDetail.Route";
import { EmployeeRegistrationRoute } from "@/features/admin/employee.registration/EmployeeRegistration.Route";
import { SubmitAttendanceRoute } from "@/features/employee/submitAttendance/SubmitAttendance.Route";
import { lazy } from "react";

const AdminLayout = lazy(() => import("@/features/admin/Admin.Layout"));
const EmployeeLayout = lazy(
  () => import("@/features/employee/Employee.Layout")
);

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
  {
    element: <AdminLayout />,
    children: [
      EmployeeListRoute,
      EmployeeRegistrationRoute,
      EmployeeDetailRoute,
    ],
  },
  {
    element: <EmployeeLayout />,
    children: [SubmitAttendanceRoute],
  },
  LoginRoute,
  {
    path: ROUTES.NOT_FOUND,
    element: <Navigate to={ROUTES.HOME} replace />,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
