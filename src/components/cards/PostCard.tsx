import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import IconComment from "../icons/IconComment";
import IconDate from "../icons/IconDate";
import IconHeart from "../icons/IconHeart";

/* eslint-disable @next/next/no-img-element */
interface PostProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  cover: string;
  author: {
    _id: string;
    name: string;
    avatar: string;
    clerkId: string;
  };
  comments: string[];
  likes: string[];
  votes: string[];
  views: number;
  createdAt: Date;
  clerkId?: string | null;
}

function PostCard({
  clerkId,
  _id,
  title,
  tags,
  author,
  likes,
  comments,
  views,
  createdAt,
  votes,
  cover,
}: PostProps) {
  return (
    <Link href={`/post/${_id}`} className="flex items-start gap-3">
      <div
        className="flex flex-col gap-1 items-center
      "
      >
        <button className="flex items-center justify-center rounded-full w-5 h-5 border bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <span className="text-xs font-semibold">{votes.length}</span>
      </div>
      <Image
        src={author?.avatar}
        alt=""
        className="w-10 h-10 rounded-full object-cover"
        width={40}
        height={40}
      />
      <div className="flex-1 flex flex-col gap-2 justify-between self-stretch">
        <h2 className="text-base lg:text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-3 text-sm text-secondary-color-3">
          <strong>{author?.name}</strong>
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
          <div className="ml-auto">
            <div className="px-2 py-1 rounded text-sm bg-gray-200 text-dark2">
              Productivity
            </div>
          </div>
        </div>
        <p className="text-secondary-color-3 text-sm line-clamp-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque natus,
          temporibus vero eveniet dolorem nihil. Alias repellat, nobis
          dignissimos libero neque non architecto laudantium suscipit excepturi
          eligendi? At, atque excepturi!
        </p>
        {/* <div>
          <div className="flex items-center gap-5 mb-2.5">
            <div className="flex ml-auto items-center gap-3">
              <ButtonLike></ButtonLike>
              <ButtonSave></ButtonSave>
            </div>
          </div>
          <div className="flex items-center gap-2.5 mb-5">
            {tags.map((item: any, index: number) => (
              <TagItem key={index} name={item.name}></TagItem>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="hidden items-center gap-3 @[480px]:flex">
            <div className="w-10 h-10 rounded-full bg-gray-100"></div>
            <div>
              <h3 className="text-secondary-color-2 font-semibold text-sm dark:text-secondary-color-6 leading-none">
                {author.name}
              </h3>
              <span className="text-secondary-color-3 text-xs">
                {new Date(createdAt).toLocaleDateString("vi-VI")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-5 text-secondary-color-3 text-[10px] @[600px]:text-sm dark:text-secondary-color-5">
            <div>{votes.length} votes</div>
            <div>{views} views</div>
            <div>{likes.length} likes</div>
            <div>{comments.length} comments</div>
          </div>
        </div> */}
      </div>
    </Link>
  );
}

export default PostCard;
