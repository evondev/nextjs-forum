import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ButtonLike from "../buttons/ButtonLike";
import IconComment from "../icons/IconComment";
import IconDate from "../icons/IconDate";
import IconHeart from "../icons/IconHeart";
import TagItem from "../shared/TagItem";
import Votes from "../shared/Votes";

/* eslint-disable @next/next/no-img-element */
interface PostProps {
  _id: string;
  title: string;
  author: {
    _id: string;
    name: string;
    avatar: string;
    clerkId: string;
  };
  comments: string[];
  likes: string[];
  points: number;
  createdAt: Date;
  userId: string;
  topic: any;
  upVotes: string[];
  downVotes: string[];
  mongoUser?: any;
}

function PostCard({
  userId,
  _id,
  title,
  author,
  likes,
  comments,
  createdAt,
  points,
  topic,
  upVotes,
  downVotes,
  mongoUser,
}: PostProps) {
  const currentUser = mongoUser ? JSON.parse(mongoUser) : null;
  return (
    <div className="flex items-start gap-3 relative">
      <ButtonLike
        postId={_id.toString()}
        userId={currentUser?._id.toString() || ""}
        likes={likes}
        className="absolute right-0 -top-3 max-xs:hidden"
      />
      <Votes
        type="post"
        itemId={JSON.stringify(_id)}
        points={points}
        userId={userId ? userId.toString() : ""}
        hasUpvoted={userId ? upVotes?.includes(JSON.parse(userId)) : false}
        hasDownvoted={userId ? downVotes?.includes(JSON.parse(userId)) : false}
      ></Votes>
      <Image
        src={author?.avatar}
        alt=""
        className="w-10 h-10 rounded-full object-cover"
        width={40}
        height={40}
      />
      <div className="flex-1 flex flex-col items-start justify-between gap-2">
        <Link href={`/post/${_id}`} className="xl:text-lg font-semibold">
          {title}
        </Link>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-wrap items-center gap-2 text-sm text-secondary-color-3 w-full">
            <span className="font-medium">{author?.name}</span>
            <div className="flex items-center gap-1">
              <IconComment className="w-4 h-4" />
              <span>{comments.length}</span>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <IconHeart className="w-4 h-4" />
              {likes.length}
            </div>
            <div className="flex items-center gap-1 font-medium">
              <IconDate className="w-4 h-4"></IconDate>
              {getTimestamp(createdAt)}
            </div>
            <Link href={`/topic/${topic?._id}`} className="ml-auto">
              <TagItem name={topic?.name}></TagItem>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
