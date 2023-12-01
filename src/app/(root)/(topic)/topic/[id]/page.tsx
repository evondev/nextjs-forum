import IconCaretRight from "@/components/icons/IconCaretRight";
import LocalSearch from "@/components/shared/LocalSearch";
import Pagination from "@/components/shared/Pagination";
import PostList from "@/components/shared/PostList";
import TopicItem from "@/components/shared/TopicItem";
import TopDiscussionWidget from "@/components/shared/widget/TopDiscussionWidget";
import { getPosts } from "@/lib/actions/post.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const TopicDetailsPage = async ({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: any;
}) => {
  const results = await getPosts({
    topic: params.id,
  });
  const { userId: clerkId } = auth();
  let mongoUser: any;
  if (clerkId) {
    mongoUser = await getUserById({
      userId: clerkId,
    });
  }
  if (!results || !results.posts || results.posts.length <= 0) return null;
  const topicName = results.posts[0].topic.name;
  return (
    <div className="py-5 grid grid-cols-[1fr_350px] gap-5">
      <div className="flex flex-col gap-5">
        <div className="p-5 bg-white rounded-lg">
          <div className="flex items-center gap-1 text-sm text-secondary-color-3 font-medium">
            <Link href="/">All Dicussions</Link>
            <IconCaretRight></IconCaretRight>
            <Link href="/topics">Topics</Link>
            <IconCaretRight></IconCaretRight>
            <span>{topicName}</span>
          </div>
          <TopicItem></TopicItem>
        </div>
        <LocalSearch></LocalSearch>
        <PostList posts={results.posts} userId={mongoUser?._id} title="" />
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          isNext={results?.isNext || false}
        ></Pagination>
      </div>
      <TopDiscussionWidget></TopDiscussionWidget>
    </div>
  );
};

export default TopicDetailsPage;
