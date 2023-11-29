import Link from "next/link";
import IconComment from "../icons/IconComment";
import MetaItem from "./MetaItem";
import Votes from "./Votes";

const PostWidgetItem = () => {
  return (
    <div className="flex items-start gap-3">
      <Votes
        userId={""}
        type={"post"}
        itemId={""}
        points={0}
        hasUpvoted={false}
        hasDownvoted={false}
      ></Votes>
      <div className="flex-1 flex flex-col gap-2">
        <Link href={`/post/demoId`} className="font-semibold block">
          How do you collect design resources?
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 rounded-full"></div>

            <span className="font-medium text-sm">Mark Wazauiski</span>
          </div>
          <MetaItem icon={<IconComment />} text={23} />
        </div>
      </div>
    </div>
  );
};

export default PostWidgetItem;
