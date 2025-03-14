import { PageTitle } from "@/components/utility/PageTitle";
import { ROUTES } from "@/constants/globals";
import { RouteObject } from "react-router-dom";

export const EmployeeDetailRoute: RouteObject = {
  path: `${ROUTES.EMPLOYEE_DETAIL}/:id`,
  lazy: async () => {
    const { EmployeeDetailPage } = await import("./EmployeeDetail.Page");
    return {
      Component: () => (
        <>
          <PageTitle title="Employee Detail" />
          <EmployeeDetailPage />
        </>
      ),
    };
  },
};
