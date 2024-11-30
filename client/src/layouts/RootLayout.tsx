import { Outlet } from "react-router-dom";

import Bottombar from "@/components/shared/Bottombar";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";

const RootLayout = () => {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <Outlet />
      <Bottombar />
    </div>
  );
};

export default RootLayout;
