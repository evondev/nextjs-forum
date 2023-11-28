import PostCard from "@/components/cards/PostCard";
import PopularTopics from "@/components/shared/PopularTopics";
import { getPosts } from "@/lib/actions/post.action";

async function Home() {
  const result = await getPosts({});
  return (
    <div className="grid xl:grid-cols-[1fr_300px] gap-5">
      <div>
        <PopularTopics></PopularTopics>
        <div className="p-5 bg-white rounded-lg">
          <h2 className="text-lg font-bold mb-5">Latest Discussions</h2>
          <div className="flex flex-col gap-5">
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
                  cover={post.cover}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Home;
