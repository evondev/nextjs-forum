import Link from "next/link";
import TopicItem from "./TopicItem";
interface PopularTopicsProps {
  data: any[];
  header?: boolean;
}
const PopularTopics = async ({ data, header = true }: PopularTopicsProps) => {
  if (!data || data.length <= 0) return null;
  return (
    <div className="p-5 bgWhite_darkBgDark3 rounded-lg mb-5">
      {header && (
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold">Popular topics</h2>
          <Link
            className="capitalize text-primary font-semibold text-sm"
            href="/topics"
          >
            See all topics
          </Link>
        </div>
      )}
      <div className="flex flex-col gap-4 @container">
        {data &&
          data.length > 0 &&
          data.map((topic, index) => (
            <TopicItem topic={topic} key={index}></TopicItem>
          ))}
      </div>
    </div>
  );
};

export default PopularTopics;
