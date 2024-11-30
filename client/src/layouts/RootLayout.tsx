import { Outlet } from "react-router-dom";

import Bottombar from "@/components/shared/Bottombar";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";

const RootLayout = () => {
  return (
    <div className="flex flex-1 flex-col">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </div>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
