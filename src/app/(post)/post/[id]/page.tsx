import Comment from "@/components/forms/Comment";
import IconBookmark from "@/components/icons/IconBookmark";
import IconHeart from "@/components/icons/IconHeart";
import ActionBarItem from "@/components/shared/ActionBarItem";
import AllComments from "@/components/shared/AllComments";
import MetaItem from "@/components/shared/MetaItem";
import ParseHTML from "@/components/shared/ParseHTML";
import TagItem from "@/components/shared/TagItem";
import UserPostsWidget from "@/components/shared/UserPostsWidget";
import UserWidget from "@/components/shared/UserWidget";
import Votes from "@/components/shared/Votes";
import { getPostById } from "@/lib/actions/post.action";
import { getUserById } from "@/lib/actions/user.action";
import { getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

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
  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({
      userId: clerkId,
    });
  }
  if (!post) return null;
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[250px_1fr_320px] gap-10 lg:items-start max-w-[1440px] mx-auto">
      <div className="bg-white dark:bg-dark3 p-5 rounded-lg flex flex-col gap-5 sticky top-[100px] max-lg:order-2">
        <ActionBarItem icon={<IconHeart />} text="0 hearts"></ActionBarItem>
        <ActionBarItem icon={<IconHeart />} text="0 bookmarks"></ActionBarItem>
        <ActionBarItem
          icon={<IconHeart />}
          text={<>{post.upvotes.length} upvotes</>}
        ></ActionBarItem>
        <ActionBarItem
          icon={<IconHeart />}
          text={<>{post.downvotes.length} downvotes</>}
        ></ActionBarItem>
      </div>
      <div className="bg-white dark:bg-dark3 rounded-lg overflow-hidden p-5">
        <div className="relative h-40 lg:h-[275px] mb-5">
          <Image
            src={post.cover}
            alt=""
            fill
            className="w-full h-full object-cover rounded"
          ></Image>
          <div className="absolute top-5 right-5 bg-white dark:bg-dark3 p-2 rounded-lg flex items-center gap-3">
            <button>
              <IconHeart></IconHeart>
            </button>
            <button>
              <IconBookmark></IconBookmark>
            </button>
          </div>
        </div>
        <div className="py-5">
          <div className="flex flex-col">
            <div className="flex items-start gap-5 mb-5 justify-between">
              <h1 className="font-bold text-xl lg:text-3xl">{post.title}</h1>
              <Votes
                type="post"
                itemId={JSON.stringify(post._id)}
                userId={JSON.stringify(mongoUser?._id)}
                upvotes={post.upvotes.length}
                downvotes={post.downvotes.length}
                hasUpvoted={post.upvotes.includes(mongoUser?._id)}
                hasDownvoted={post.downvotes.includes(mongoUser?._id)}
              ></Votes>
            </div>
            <div className="flex items-center gap-2 lg:gap-10 mb-5 whitespace-nowrap">
              <MetaItem
                icon="/icons/icon-clock.svg"
                text={<>{getTimestamp(post.createdAt)}</>}
              ></MetaItem>
              <MetaItem
                icon="/icons/icon-comment.svg"
                text={<>{post.comments.length} comments</>}
              ></MetaItem>
              <MetaItem
                icon="/icons/icon-eye.svg"
                text={<>{post.views} views</>}
              ></MetaItem>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag: any) => (
                <Link
                  href={`/tag/${tag._id}`}
                  key={tag._id}
                  className="text-[#EC9F41] inline-block"
                >
                  <TagItem name={tag.name} />
                </Link>
              ))}
            </div>
            <ParseHTML data={post.content}></ParseHTML>
            <AllComments
              userId={JSON.stringify(mongoUser?._id)}
              totalComments={post.comments.length}
              postId={post._id}
            ></AllComments>
            <Comment
              authorId={JSON.stringify(mongoUser?._id)}
              postId={JSON.stringify(post._id)}
              post={post.content}
            ></Comment>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 order-3">
        <UserWidget user={post.author}></UserWidget>
        <UserPostsWidget></UserPostsWidget>
      </div>
    </div>
  );
}

export default PostDetailsPage;
