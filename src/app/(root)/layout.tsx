import LeftSidebar from "@/components/shared/LeftSidebar";
import { NavBar } from "@/components/shared/navbar/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[260px_minmax(0,1fr)] gap-5 items-start">
        <LeftSidebar></LeftSidebar>
        {children}
      </div>
    </>
  );
};
export default Layout;
