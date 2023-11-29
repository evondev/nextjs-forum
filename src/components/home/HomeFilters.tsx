"use client";
import { homePageFilters } from "@/constants";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

function HomeFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sorted = searchParams.get("sorted")
    ? searchParams.get("sorted")
    : "latest";
  const handleFilter = (filter: string) => {
    if (filter === sorted) return;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "sorted",
      value: filter,
    });
    router.push(newUrl);
  };
  return (
    <div className="flex gap-1 flex-wrap mb-5">
      {homePageFilters.map((filter, index) => (
        <button
          key={filter.name}
          className={twMerge(
            "text-sm py-2 px-5 rounded-lg bg-transparent",
            sorted === filter.value &&
              "bg-secondary bg-opacity-10 text-secondary font-semibold"
          )}
          onClick={() => handleFilter(filter.value)}
        >
          {filter.name}
        </button>
      ))}
    </div>
  );
}

export default HomeFilters;
