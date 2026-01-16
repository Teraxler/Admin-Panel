import { Outlet } from "react-router";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import SvgIcons from "../components/common/SvgIcons";
import { Toaster } from "sonner";
import { useState } from "react";
import { Overlay } from "../components/Overlay";

function DashboardLayout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <>
      <SvgIcons />

      <div className="flex bg-neutral-100 min-h-svh">
        <Sidebar
          isVisible={isSidebarVisible}
          onClick={() => setIsSidebarVisible(false)}
        />
        <div className="w-[calc(100%-190px)] lg:w-[calc(100%-260px)] grow shrink">
          <Header
            onClick={() => setIsSidebarVisible((prevValue) => !prevValue)}
          />
          <main className="px-4 sm:px-6 lg:px-8 pt-4 pb-18">
            <Outlet />
            <Toaster richColors position="top-right" />
            {isSidebarVisible ? (
              <Overlay onClick={() => setIsSidebarVisible(false)} />
            ) : null}
          </main>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
