import { PageTitle } from "@/components/utility/PageTitle";
import { ROUTES } from "@/constants/globals";
import { RouteObject } from "react-router-dom";

export const EmployeeListRoute: RouteObject = {
  path: ROUTES.EMPLOYEE_LIST,
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
