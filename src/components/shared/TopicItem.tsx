import Image from "next/image";
import Link from "next/link";

function TopicItem({ topic }: { topic?: any }) {
  if (!topic) return null;
  return (
    <Link
      href={`/topic/${topic._id}`}
      className="flex @sm:items-center flex-col @sm:flex-row items-start justify-between gap-2"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Image
            width={20}
            height={20}
            src={topic.icon}
            alt="icon"
            className="w-5 h-5"
          />
        </div>
        <div>
          <h3 className="font-semibold">{topic.name}</h3>
          <div className="text-sm text-secondary-color-3">{topic.desc}</div>
        </div>
      </div>
      <div className="px-2 py-1 rounded bg-secondary bg-opacity-20 text-sm relative left-[52px] @sm:left-0">
        {topic.postCount} discussion
      </div>
    </Link>
  );
}
export default TopicItem;
