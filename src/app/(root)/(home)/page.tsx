import PostCard from "@/components/cards/PostCard";
import HomeFilters from "@/components/home/HomeFilters";
import LeftSidebar from "@/components/shared/LeftSidebar";
import { getPosts } from "@/lib/actions/post.action";

async function Home() {
  const result = await getPosts({});
  return (
    <div className="grid grid-cols-[250px_minmax(0,1fr)] gap-5 max-w-[1440px] mx-auto">
      <LeftSidebar></LeftSidebar>
      <div className="flex flex-col gap-5">
        <HomeFilters></HomeFilters>
        {result?.posts.map((post, index) => (
          <PostCard
            key={post._id}
            _id={post._id}
            title={post.title}
            tags={post.tags}
            author={post.author}
            upvotes={post.upvotes}
            views={post.views}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
