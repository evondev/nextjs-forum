"use client";
import IconSearch from "@/components/icons/IconSearch";
import { Input } from "@/components/ui/input";
import { twMerge } from "tailwind-merge";

interface SearchProps {
  route: string;
  placeholder?: string;
  className?: string;
}
function Search({
  route,
  placeholder = "Search",
  className = "flex-1",
}: SearchProps) {
  return (
    <div
      className={twMerge(
        "py-3 px-5 bg-white dark:bg-dark4 rounded-lg flex items-center h-12 gap-5",
        className
      )}
    >
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        className="no-focus border-none py-0 h-auto px-0"
      />
      <button type="button" className="cursor-pointer">
        <IconSearch />
      </button>
    </div>
  );
}

export default Search;
