"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useTransition } from "react";
import { Input } from "../ui/input";

const LocalSearch = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useSearchParams();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      startTransition(() => {
        router.push(`/?search=${e.target.value}`);
      });
    }, 1000);
  };
  return (
    <div className="mb-5 relative">
      <Input
        className="no-focus bg-white h-12"
        placeholder="Search dicussions..."
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
