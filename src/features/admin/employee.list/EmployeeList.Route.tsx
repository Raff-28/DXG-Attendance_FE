import { PageTitle } from "@/components/utility/PageTitle";
import { RouteObject } from "react-router-dom";

export const EmployeeListRoute: RouteObject = {
  path: "/admin/employee-list",
  lazy: async () => {
    const { EmployeeListPage } = await import("./EmployeeList.Page");
    return {
      Component: () => (
        <>
          <PageTitle title="List of Employees" />
          <EmployeeListPage />
        </>
      ),
    };
  },
};
