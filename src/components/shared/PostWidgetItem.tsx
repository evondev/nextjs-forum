import Image from "next/image";
import Link from "next/link";
import IconComment from "../icons/IconComment";
import MetaItem from "./MetaItem";
import Votes from "./Votes";

const PostWidgetItem = ({
  post,
  author,
  mongoUser,
}: {
  post: any;
  author: any;
  mongoUser: any;
}) => {
  if (!post || !author) return null;
  return (
    <div className="flex items-start gap-3">
      <Votes
        type="post"
        itemId={JSON.stringify(post._id)}
        userId={JSON.stringify(mongoUser?._id)}
        points={post?.points}
        hasUpvoted={post?.upVotes?.includes(mongoUser?._id)}
        hasDownvoted={post?.downVotes?.includes(mongoUser?._id)}
      ></Votes>
      <div className="flex-1 flex flex-col gap-2">
        <Link href={`/post/demoId`} className="font-semibold block">
          {post.title}
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image
              src={author.avatar}
              width={20}
              height={20}
              alt=""
              className="w-5 h-5 object-cover rounded-full"
            />

            <span className="font-medium text-sm">{author.username}</span>
          </div>
          <MetaItem icon={<IconComment />} text={post.comments.length} />
        </div>
      </div>
    </div>
  );
};

export default PostWidgetItem;
