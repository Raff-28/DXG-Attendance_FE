import { PageTitle } from "@/components/utility/PageTitle";
import { RequireRole } from "@/components/utility/RequireRole";
import { ROUTES } from "@/constants/globals";
import { RouteObject } from "react-router-dom";

export const LoginRoute: RouteObject = {
  path: ROUTES.LOGIN,
  lazy: async () => {
    const { LoginPage } = await import("./Login.Page");
    return {
      Component: () => (
        <RequireRole role={["guest"]}>
          <PageTitle title="Login to access the app" />
          <LoginPage />
        </RequireRole>
      ),
    };
  },
};
