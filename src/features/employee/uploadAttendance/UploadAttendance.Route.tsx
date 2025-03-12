import { PageTitle } from "@/components/utility/PageTitle";
import { RequireRole } from "@/components/utility/RequireRole";
import { RouteObject } from "react-router-dom";

export const UploadAttendanceRoute: RouteObject = {
  path: "/login",
  lazy: async () => {
    const { UploadAttendancePage } = await import("./UploadAttendance.Page");
    return {
      Component: () => (
        <RequireRole role={["employee"]} redirectRoute="/login">
          <PageTitle title="Upload Attendance" />
          <UploadAttendancePage />
        </RequireRole>
      ),
    };
  },
};
