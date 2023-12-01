import HomeFilters from "@/components/home/HomeFilters";
import LocalSearch from "@/components/shared/LocalSearch";
import Pagination from "@/components/shared/Pagination";
import PopularTopics from "@/components/shared/PopularTopics";
import PostList from "@/components/shared/PostList";
import HitsUsersWidget from "@/components/shared/widget/HitsUsersWidget";
import TopDiscussionWidget from "@/components/shared/widget/TopDiscussionWidget";
import { getPosts } from "@/lib/actions/post.action";
import { getAllTopics } from "@/lib/actions/topic.action";
import { getAllUsers, getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

async function Home({ searchParams }: { searchParams: any }) {
  const results = await getPosts({
    searchQuery: searchParams?.search,
    page: searchParams.page ? +searchParams.page : 1,
    sorted: searchParams.sorted || "latest",
  });
  const topPosts = await getPosts({
    sorted: "popular",
    pageSize: 5,
  });
  const topics = await getAllTopics();
  const { userId: clerkId } = auth();
  let mongoUser: any;
  if (clerkId) {
    mongoUser = await getUserById({
      userId: clerkId,
    });
  }
  const users = await getAllUsers({});
  return (
    <div className="grid xl:grid-cols-[1fr_350px] gap-5 pr-5">
      <div>
        <PopularTopics data={topics || []}></PopularTopics>
        <LocalSearch></LocalSearch>
        <HomeFilters></HomeFilters>
        <PostList
          posts={results?.posts || []}
          userId={JSON.stringify(mongoUser?._id)}
        ></PostList>
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          isNext={results?.isNext || false}
        ></Pagination>
      </div>
      <div className="flex flex-col gap-10">
        <TopDiscussionWidget
          posts={topPosts?.posts || []}
          userId={mongoUser?._id}
        ></TopDiscussionWidget>
        <HitsUsersWidget
          userId={mongoUser?._id}
          users={users || []}
        ></HitsUsersWidget>
      </div>
    </div>
  );
}

export default Home;
