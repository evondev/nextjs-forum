import IconComment from "@/components/icons/IconComment";
import Image from "next/image";
import Link from "next/link";
import HeadingWidget from "../HeadingWidget";
import MetaItem from "../MetaItem";
import Votes from "../Votes";

const TopDiscussionWidget = ({
  posts,
  userId,
}: {
  posts?: any[];
  userId?: string;
}) => {
  if (!posts || posts.length <= 0) return null;
  return (
    <div className="p-5 bgWhite_darkBgDark3 rounded-lg">
      <HeadingWidget className="mb-5">Top Discussions</HeadingWidget>
      <div className="flex flex-col gap-5">
        {posts.map((item, index) => (
          <DiscusstionItem userId={userId} item={item} key={index} />
        ))}
      </div>
    </div>
  );
};
const DiscusstionItem = ({ item, userId }: { item: any; userId?: string }) => {
  return (
    <div className="flex items-start gap-3">
      <Votes
        userId={userId?.toString()}
        type={"post"}
        itemId={JSON.stringify(item?._id)}
        points={item?.points}
        hasUpvoted={item?.upVotes?.includes(userId)}
        hasDownvoted={item?.downVotes?.includes(userId)}
      ></Votes>
      <div className="flex-1 flex flex-col gap-2">
        <Link href={`/post/${item._id}`} className="font-semibold block">
          {item?.title}
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image
              src={item?.author?.avatar}
              width={20}
              height={20}
              className="rounded-full object-cover w-5 h-5"
              alt="avatar"
            />
            <span className="font-medium text-sm text-secondary-color-3">
              {item?.author?.name}
            </span>
          </div>
          <MetaItem icon={<IconComment />} text={item.comments.length || 0} />
        </div>
      </div>
    </div>
  );
};

export default TopDiscussionWidget;
