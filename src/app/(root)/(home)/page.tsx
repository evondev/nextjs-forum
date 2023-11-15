import PostCard from "@/components/cards/PostCard";
import HomeFilters from "@/components/home/HomeFilters";
import LeftSidebar from "@/components/shared/LeftSidebar";
import { getPosts } from "@/lib/actions/post.action";

async function Home() {
  const result = await getPosts({});
  return (
    <div className="grid grid-cols-[210px_minmax(0,1fr)_285px] gap-5 max-w-[1440px] mx-auto">
      <LeftSidebar></LeftSidebar>
      <div className="flex flex-col gap-5">
        <HomeFilters></HomeFilters>
        {result?.posts.map((item, index) => (
          <PostCard key={index} item={item} />
        ))}
      </div>
      <div>3</div>
    </div>
  );
}

export default Home;
