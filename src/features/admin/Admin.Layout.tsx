import { RequireRole } from "@/components/utility/RequireRole";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <RequireRole role={["admin"]}>
      <h1>Admin Layout</h1>
      <Outlet />
    </RequireRole>
  );
};

export default AdminLayout;
