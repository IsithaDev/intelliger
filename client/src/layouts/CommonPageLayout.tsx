import { Outlet } from "react-router-dom";

import CommonSidebar from "@/components/shared/CommonSidebar";

const CommonPageLayout = () => {
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <CommonSidebar />
    </div>
  );
};

export default CommonPageLayout;
