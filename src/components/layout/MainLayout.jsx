import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full bg-[#F9FAFB] dark:bg-background-dark">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
