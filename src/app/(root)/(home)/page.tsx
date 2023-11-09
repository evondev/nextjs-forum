import LeftSidebar from "@/components/shared/LeftSidebar";

function Home() {
  return (
    <div className="grid grid-cols-[210px_minmax(0,1fr)_285px] gap-5">
      <LeftSidebar></LeftSidebar>
      <div>2</div>
      <div>3</div>
    </div>
  );
}

export default Home;
