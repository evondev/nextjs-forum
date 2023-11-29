import PopularTopics from "@/components/shared/PopularTopics";
import PostList from "@/components/shared/PostList";
import HitsUsersWidget from "@/components/shared/widget/HitsUsersWidget";
import TopDiscussionWidget from "@/components/shared/widget/TopDiscussionWidget";
import { getPosts } from "@/lib/actions/post.action";
import { getAllTopics } from "@/lib/actions/topic.action";
import { getAllUsers, getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

async function Home() {
  const posts = await getPosts({
    sorted: "latest",
  });
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
    <div className="grid xl:grid-cols-[1fr_350px] gap-5 pr-5">
      <div>
        <PopularTopics data={topics || []}></PopularTopics>
        <PostList posts={posts || []} userId={mongoUser?._id}></PostList>
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
