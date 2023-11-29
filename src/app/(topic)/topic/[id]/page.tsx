import IconCaretRight from "@/components/icons/IconCaretRight";
import TopicItem from "@/components/shared/TopicItem";
import TopDiscussionWidget from "@/components/shared/widget/TopDiscussionWidget";
import Link from "next/link";

const TopicDetailsPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  return (
    <div className="py-5 grid grid-cols-[1fr_350px] gap-5">
      <div className="flex flex-col gap-5">
        <div className="p-5 bg-white rounded-lg">
          <div className="flex items-center gap-1 text-sm text-secondary-color-3 mb-5 font-medium">
            <Link href="/">All Dicussions</Link>
            <IconCaretRight></IconCaretRight>
            <Link href="/topics">Topics</Link>
          </div>
          <TopicItem></TopicItem>
        </div>
      </div>
      <TopDiscussionWidget></TopDiscussionWidget>
    </div>
  );
};

export default TopicDetailsPage;
