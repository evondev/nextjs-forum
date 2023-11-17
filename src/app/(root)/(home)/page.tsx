import PostCard from "@/components/cards/PostCard";
import HomeFilters from "@/components/home/HomeFilters";
import { getPosts } from "@/lib/actions/post.action";

async function Home() {
  const result = await getPosts({});
  return (
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
  );
}

export default Home;
