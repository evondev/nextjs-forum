import LeftSidebar from "@/components/shared/LeftSidebar";
import { NavBar } from "@/components/shared/navbar/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      <div className="py-5 px-10">
        <div className="grid grid-cols-[260px_minmax(0,1fr)_260px] gap-5 max-w-[1440px] mx-auto min-h-screen items-start">
          <LeftSidebar></LeftSidebar>
          {children}
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
