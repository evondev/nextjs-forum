"use client";
import { formUrlQuery } from "@/lib/utils";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { twMerge } from "tailwind-merge";
const Pagination = ({
  isNext,
  pageNumber,
}: {
  isNext: boolean;
  pageNumber: number;
}) => {
  const classNames = "w-10 h-10 rounded-lg flex items-center justify-center";
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;
  return (
    <div className="mt-5 flex items-center justify-center gap-3">
      <button
        type="button"
        className={classNames}
        onClick={() => handleNavigation("prev")}
      >
        <ArrowLeftIcon className="w-4 h-4"></ArrowLeftIcon>
      </button>
      <span className={twMerge(classNames, "text-white bg-primary")}>
        {pageNumber}
      </span>
      <button
        type="button"
        className={classNames}
        onClick={() => handleNavigation("next")}
      >
        <ArrowRightIcon className="w-4 h-4"></ArrowRightIcon>
      </button>
    </div>
  );
};

export default Pagination;
