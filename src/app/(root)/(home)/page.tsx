import PostCard from "@/components/cards/PostCard";
import HomeFilters from "@/components/home/HomeFilters";
import Search from "@/components/shared/search/Search";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/actions/post.action";
import Link from "next/link";

async function Home() {
  const result = await getPosts({});
  return (
    <div className="grid xl:grid-cols-[1fr_300px] gap-5">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold">All posts</h1>
          <Link href="/create-post">
            <Button className="text-white font-semibold">Create post</Button>
          </Link>
        </div>
        <Search
          route="/"
          placeholder="Search for posts"
          className="flex-1"
        ></Search>
        <HomeFilters></HomeFilters>
        <div className="@container">
          {result?.posts.map((post, index) => (
            <PostCard
              key={post._id}
              _id={post._id}
              title={post.title}
              tags={post.tags}
              author={post.author}
              likes={post.likes}
              views={post.views}
              comments={post.comments}
              votes={post.upvotes}
              createdAt={post.createdAt}
            />
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Home;
