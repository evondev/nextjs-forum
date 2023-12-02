"use client";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useTransition } from "react";
import { Input } from "../ui/input";

const LocalSearch = ({
  placeholder = "Search discussions",
  searchParams,
}: {
  placeholder?: string;
  searchParams?: any;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useSearchParams();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTimeout(() => {
      startTransition(() => {
        const newUrl = formUrlQuery({
          params: searchParams,
          key: "search",
          value,
        });
        router.push(newUrl);
      });
    }, 1000);
  };
  return (
    <div className="mb-5 relative">
      <Input
        className="no-focus bg-white dark:bg-dark3 dark:border-dark3 h-12"
        placeholder={placeholder}
        onChange={handleChange}
        defaultValue={params.get("search") || ""}
      />
      {isPending && (
        <div className="w-5 h-5 rounded-full border border-gray-400 animate-spin border-t-transparent absolute right-5 top-[14px]"></div>
      )}
    </div>
  );
};

export default LocalSearch;
