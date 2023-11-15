import Link from "next/link";

function HomeFilters() {
  return (
    <div className="p-5 bg-white rounded-2xl flex items-center gap-5">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
      <input
        type="text"
        placeholder="Let’s share what going on your mind..."
        className="w-full outline-none p-3 bg-secondary-color-6 rounded-md text-sm"
      />
      <Link
        href="/create-post"
        className="px-4 py-3 text-white text-sm font-medium bg-primary flex-shrink-0 rounded-md"
      >
        Create Post
      </Link>
    </div>
  );
}

export default HomeFilters;
