import { Sidebar, SidebarMenu } from "@/components/sidebar/Sidebar";
import { RequireRole } from "@/components/utility/RequireRole";
import { ROUTES } from "@/constants/globals";
import { UserRoundPen } from "lucide-react";
import { Outlet } from "react-router-dom";

const employeeMenus: SidebarMenu[] = [
  {
    title: "Submit Attendance",
    icon: <UserRoundPen />,
    link: ROUTES.SUBMIT_ATTENDANCE,
  },
];

const EmployeeLayout = () => {
  return (
    <RequireRole role={["employee"]}>
      <Sidebar menus={employeeMenus}>
        <Outlet />
      </Sidebar>
    </RequireRole>
  );
};

export default EmployeeLayout;
