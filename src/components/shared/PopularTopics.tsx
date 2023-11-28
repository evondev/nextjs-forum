import Link from "next/link";

const PopularTopics = () => {
  return (
    <div className="p-5 bg-white rounded-lg mb-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold">Popular topics</h2>
        <Link
          className="capitalize text-primary font-semibold text-sm"
          href="/topics"
        >
          See all topics
        </Link>
      </div>
      <div className="flex flex-col gap-4"></div>
    </div>
  );
};

function TopicItem() {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100"></div>
        <div>
          <h3 className="font-semibold">Gaming</h3>
          <div className="text-sm text-secondary-color-3">
            A discussion topic about gaming
          </div>
        </div>
      </div>
      <div className="px-2 py-1 rounded bg-secondary bg-opacity-20 text-sm">
        243 discussion
      </div>
    </div>
  );
}

export default PopularTopics;
