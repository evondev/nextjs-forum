import LeftSidebar from "@/components/shared/LeftSidebar";
import { NavBar } from "@/components/shared/navbar/NavBar";
import { getAllTopics } from "@/lib/actions/topic.action";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const topics = await getAllTopics({
    page: 1,
    pageSize: 5,
  });
  return (
    <>
      <NavBar />
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[260px_minmax(0,1fr)] items-start">
        <LeftSidebar topics={topics || []}></LeftSidebar>
        <div className="p-5">{children}</div>
      </div>
    </>
  );
};
export default Layout;
