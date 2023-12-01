import LocalSearch from "@/components/shared/LocalSearch";
import NoResults from "@/components/shared/NoResults";
import PopularTopics from "@/components/shared/PopularTopics";
import { getAllTopics } from "@/lib/actions/topic.action";

const TopicsPage = async ({ searchParams }: { searchParams: any }) => {
  const topics = await getAllTopics({
    searchQuery: searchParams?.search,
  });
  const emptyResults = topics?.length === 0;

  return (
    <div className="py-5 max-w-3xl">
      <LocalSearch
        placeholder="Search topics..."
        searchParams={searchParams}
      ></LocalSearch>
      {emptyResults && (
        <NoResults
          title="No topics found"
          description="Try searching for something else."
          link="/"
          linkTitle="Go back home"
        />
      )}
      <PopularTopics header={false} data={topics || []}></PopularTopics>
    </div>
  );
};

export default TopicsPage;
