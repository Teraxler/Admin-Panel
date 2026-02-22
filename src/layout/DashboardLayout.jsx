import { useState } from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { useToastMessage } from "@/hooks/useToastMessage";
import Overlay from "@/components/Overlay";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import SvgIcons from "@/components/common/SvgIcons";

function DashboardLayout() {
  useToastMessage();

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const hideSidebar = () => setIsSidebarVisible(false);
  const toggleSidebar = () => setIsSidebarVisible((prevValue) => !prevValue);

  return (
    <>
      <SvgIcons />
      <Toaster richColors position="top-right" />

      <div className="flex bg-neutral-100 min-h-svh">
        <Sidebar isVisible={isSidebarVisible} onClick={hideSidebar} />
        <div className="w-[calc(100%-190px)] lg:w-[calc(100%-260px)] grow shrink">
          <Header onClick={toggleSidebar} />
          <main className="px-4 sm:px-6 lg:px-8 pt-4 pb-18">
            <Outlet />
            {isSidebarVisible ? <Overlay onClick={hideSidebar} /> : null}
          </main>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
