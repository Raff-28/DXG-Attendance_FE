import { PageTitle } from "@/components/utility/PageTitle";
import { RequireRole } from "@/components/utility/RequireRole";
import { RouteObject } from "react-router-dom";

export const EmployeeListRoute: RouteObject = {
  path: "/admin/employee-list",
  lazy: async () => {
    const { EmployeeListPage } = await import("./EmployeeList.Page");
    return {
      Component: () => (
        <RequireRole role={["admin"]}>
          <PageTitle title="List of Employees" />
          <EmployeeListPage />
        </RequireRole>
      ),
    };
  },
};
