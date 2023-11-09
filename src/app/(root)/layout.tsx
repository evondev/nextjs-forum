import { NavBar } from "@/components/shared/navbar/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      <div className="py-5 px-10">{children}</div>
    </div>
  );
};
export default Layout;
