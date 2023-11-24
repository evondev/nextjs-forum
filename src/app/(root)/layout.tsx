import LeftSidebar from "@/components/shared/LeftSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-5 max-w-[1440px] mx-auto min-h-screen items-start">
        <LeftSidebar></LeftSidebar>
        {children}
      </div>
    </div>
  );
};
export default Layout;
