import ButtonLike from "@/components/buttons/ButtonLike";
import Comment from "@/components/forms/Comment";
import IconComment from "@/components/icons/IconComment";
import IconDate from "@/components/icons/IconDate";
import AllComments from "@/components/shared/AllComments";
import MetaItem from "@/components/shared/MetaItem";
import ParseHTML from "@/components/shared/ParseHTML";
import Votes from "@/components/shared/Votes";
import MoreFromWidget from "@/components/shared/widget/MoreFromWidget";
import ShareWidget from "@/components/shared/widget/ShareWidget";
import TopDiscussionWidget from "@/components/shared/widget/TopDiscussionWidget";
import { getPostById, getPosts } from "@/lib/actions/post.action";
import { getUserById } from "@/lib/actions/user.action";
import { getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

async function PostDetailsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: URLSearchParams;
}) {
  const post = await getPostById({
    postId: params.id,
  });

  const { userId: clerkId } = auth();
  let mongoUser: any;
  if (clerkId) {
    mongoUser = await getUserById({
      userId: clerkId,
    });
  }
  if (!post) return null;
  const author = post.author;
  const allPosts = await getPosts({
    userId: author._id,
  });
  const otherPosts = await getPosts({
    pageSize: 10,
  });

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-5 lg:items-start pl-0">
      <div>
        <div className="p-5 bg-white dark:bg-dark3 rounded-lg mb-5 relative">
          <ButtonLike
            className="absolute right-5 top-2"
            postId={post._id.toString()}
            userId={mongoUser?._id.toString()}
            likes={post?.likes}
          ></ButtonLike>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <Votes
                type="post"
                itemId={JSON.stringify(post._id)}
                userId={JSON.stringify(mongoUser?._id)}
                points={post?.points}
                hasUpvoted={post?.upVotes?.includes(mongoUser?._id)}
                hasDownvoted={post?.downVotes?.includes(mongoUser?._id)}
              ></Votes>
              <div className="flex items-center gap-4">
                <Image
                  src={author?.avatar}
                  width={40}
                  height={40}
                  alt=""
                  className="w-10 h-10 object-cover rounded-full"
                />
                <div>
                  <h3 className="font-bold">{author?.name}</h3>
                  <div className="text-secondary-color-3 text-sm">
                    @{author?.username}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MetaItem
                icon={<IconComment className="w-4 h-4"></IconComment>}
                text={<>{post.comments.length} reply</>}
              />
              <MetaItem
                icon={<IconDate className="w-4 h-4"></IconDate>}
                text={<>{getTimestamp(post?.createdAt)}</>}
              />
            </div>
          </div>
          <h1 className="font-bold text-xl lg:text-2xl mb-5">{post.title}</h1>
          <ParseHTML data={post.content}></ParseHTML>
        </div>
        <div className="p-5 bg-white dark:bg-dark3 rounded-lg">
          <Comment
            authorId={JSON.stringify(mongoUser?._id)}
            postId={JSON.stringify(post._id)}
            post={post.content}
          ></Comment>
          <AllComments
            userId={mongoUser?._id}
            totalComments={post.comments.length}
            postId={post._id}
          ></AllComments>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <ShareWidget></ShareWidget>
        <MoreFromWidget
          user={author}
          posts={allPosts?.posts}
          mongoUser={JSON.stringify(mongoUser)}
        ></MoreFromWidget>
        <TopDiscussionWidget
          userId={JSON.stringify(mongoUser?._id)}
          posts={otherPosts?.posts}
        ></TopDiscussionWidget>
      </div>
    </div>
  );
}

export default PostDetailsPage;
