import { EmployeeListRoute } from "@/features/admin/employee.list/EmployeeList.Route";
import { LoginRoute } from "@/features/common/login/Login.Route";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { PageTitle } from "@/components/utility/PageTitle";
import { ROUTES } from "@/constants/globals";
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
    element: (
      <>
        <PageTitle title="Home" />
        <div>
          <p>Home Page</p>
        </div>
      </>
    ),
  },
  {
    element: <AdminLayout />,
    children: [EmployeeListRoute, EmployeeRegistrationRoute],
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
