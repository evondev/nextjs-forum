import PostCard from "@/components/cards/PostCard";
import PopularTopics from "@/components/shared/PopularTopics";
import HitsUsersWidget from "@/components/shared/widget/HitsUsersWidget";
import TopDiscussionWidget from "@/components/shared/widget/TopDiscussionWidget";
import { getPosts } from "@/lib/actions/post.action";
import { getAllTopics } from "@/lib/actions/topic.action";
import { getAllUsers, getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

async function Home() {
  const posts = await getPosts({});
  const topPosts = await getPosts({
    sorted: "top",
  });
  const topics = await getAllTopics();
  const users = await getAllUsers({});
  const { userId: clerkId } = auth();
  let mongoUser: any;
  if (clerkId) {
    mongoUser = await getUserById({
      userId: clerkId,
    });
  }
  return (
    <div className="grid xl:grid-cols-[1fr_350px] gap-5">
      <div>
        <PopularTopics data={topics || []}></PopularTopics>
        <div className="p-5 bgWhite_darkBgDark3 rounded-lg">
          <h2 className="text-lg font-bold mb-5">Latest Discussions</h2>
          <div className="flex flex-col gap-10">
            {posts?.map((post, index) => (
              <PostCard
                key={post._id}
                _id={post._id}
                title={post.title}
                author={post.author}
                likes={post.likes}
                comments={post.comments}
                points={post.points}
                createdAt={post.createdAt}
                userId={mongoUser?._id}
                topic={post.topic}
                upVotes={post.upVotes}
                downVotes={post.downVotes}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <TopDiscussionWidget
          posts={topPosts || []}
          userId={mongoUser?._id}
        ></TopDiscussionWidget>
        <HitsUsersWidget users={users || []}></HitsUsersWidget>
      </div>
    </div>
  );
}

export default Home;
