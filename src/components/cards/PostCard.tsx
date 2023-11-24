import Link from "next/link";
import ButtonLike from "../buttons/ButtonLike";
import ButtonSave from "../buttons/ButtonSave";
import TagItem from "../shared/TagItem";

/* eslint-disable @next/next/no-img-element */
interface PostProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
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
}: PostProps) {
  return (
    <Link
      href={`/post/${_id}`}
      className="bg-white p-5 rounded-2xl flex items-start gap-5 relative dark:bg-dark3"
    >
      <img
        src="https://plus.unsplash.com/premium_photo-1696879453950-a121fad02642?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5OTk4MjY4MA&ixlib=rb-4.0.3&q=80&w=1080"
        alt=""
        className="w-14 @[600px]:w-[156px] contain aspect-square rounded @[600px]:rounded-2xl object-cover flex-shrink-0"
      />
      <div className="flex-1 flex flex-col justify-between self-stretch">
        <div>
          <div className="flex items-center gap-5 mb-2.5">
            <h2 className="text-sm @[600px]:text-xl font-semibold max-w-[90%]">
              {title}
            </h2>
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
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
