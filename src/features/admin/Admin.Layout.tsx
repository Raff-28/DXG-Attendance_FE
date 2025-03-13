import { Sidebar } from "@/components/sidebar/Sidebar";
import { RequireRole } from "@/components/utility/RequireRole";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <RequireRole role={["admin"]}>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </RequireRole>
  );
};

export default AdminLayout;
