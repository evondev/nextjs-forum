import { homePageFilters } from "@/constants";

function HomeFilters() {
  return (
    <div className="flex gap-5 flex-wrap">
      {homePageFilters.map((filter) => (
        <button
          key={filter.name}
          className="text-sm py-2 px-5 rounded-lg bg-white text-secondary-color-3 font-medium hover:text-primary hover:bg-primary hover:bg-opacity-10 dark:bg-dark4 dark:text-white"
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
}

export default HomeFilters;
