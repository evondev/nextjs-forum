import Search from "@/components/shared/search/Search";
import { getAllTags } from "@/lib/actions/tag.action";
import Link from "next/link";

const TagsPage = async () => {
  const tags = await getAllTags({});
  return (
    <div>
      <h1 className="font-bold text-3xl mb-5">All tags</h1>
      <Search
        route="/tags"
        placeholder="Search tags..."
        className="flex-1"
      ></Search>
      <div className="flex flex-wrap gap-2 py-10">
        {tags &&
          tags.length > 0 &&
          tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="p-2 bg-white shadow-sm flex items-center justify-between text-lg gap-5"
            >
              <span className="inline-block py-1 px-4 text-sm rounded-lg bg-gray-100">
                #{tag.name}
              </span>
              <span className="text-sm text-primary font-medium">
                {tag.posts.length} posts
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default TagsPage;
