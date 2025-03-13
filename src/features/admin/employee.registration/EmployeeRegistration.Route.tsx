import { PageTitle } from "@/components/utility/PageTitle";
import { ROUTES } from "@/constants/globals";
import { RouteObject } from "react-router-dom";

export const EmployeeRegistrationRoute: RouteObject = {
  path: ROUTES.EMPLOYEE_REGISTRATION,
  lazy: async () => {
    const { EmployeeRegistrationPage } = await import(
      "./EmployeeRegistration.Page"
    );
    return {
      Component: () => (
        <>
          <PageTitle title="Add a New Employee" />
          <EmployeeRegistrationPage />
        </>
      ),
    };
  },
};
