import { NavBar } from "@/components/shared/navbar/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      <div className="mt-8"></div>
      {children}
    </div>
  );
};
export default Layout;
