import { RequireRole } from "@/components/utility/RequireRole";
import { Outlet } from "react-router-dom";

const EmployeeLayout = () => {
  return (
    <RequireRole role={["employee"]}>
      <h1>Employee Layout</h1>
      <Outlet />
    </RequireRole>
  );
};

export default EmployeeLayout;
