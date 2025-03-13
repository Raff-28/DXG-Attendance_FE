import { Sidebar, SidebarMenu } from "@/components/sidebar/Sidebar";
import { RequireRole } from "@/components/utility/RequireRole";
import { ROUTES } from "@/constants/globals";
import { List, UserPlus } from "lucide-react";
import { Outlet } from "react-router-dom";

const adminMenus: SidebarMenu[] = [
  {
    title: "List of Employees",
    icon: <List />,
    link: ROUTES.EMPLOYEE_LIST,
  },
  {
    title: "Add new Employee",
    icon: <UserPlus />,
    link: ROUTES.EMPLOYEE_REGISTRATION,
  },
];

const AdminLayout = () => {
  return (
    <RequireRole role={["admin"]}>
      <Sidebar menus={adminMenus}>
        <Outlet />
      </Sidebar>
    </RequireRole>
  );
};

export default AdminLayout;
