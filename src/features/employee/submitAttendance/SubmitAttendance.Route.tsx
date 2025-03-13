import { PageTitle } from "@/components/utility/PageTitle";
import { ROUTES } from "@/constants/globals";
import { RouteObject } from "react-router-dom";

export const SubmitAttendanceRoute: RouteObject = {
  path: ROUTES.SUBMIT_ATTENDANCE,
  lazy: async () => {
    const { SubmitAttendancePage } = await import("./SubmitAttendance.Page");
    return {
      Component: () => (
        <>
          <PageTitle title="Submit Attendance" />
          <SubmitAttendancePage />
        </>
      ),
    };
  },
};
