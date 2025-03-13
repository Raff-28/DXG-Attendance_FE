import { PageTitle } from "@/components/utility/PageTitle";
import { RouteObject } from "react-router-dom";

export const SubmitAttendanceRoute: RouteObject = {
  path: "/employee/submit-attendance",
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
