"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { twMerge } from "tailwind-merge";
interface FilterProps {
  filters: {
    name: string;
    value: string;
  }[];
  className?: string;
  containerClassName?: string;
}
const Filter = ({
  filters,
  className = "",
  containerClassName = "",
}: FilterProps) => {
  return (
    <div className={twMerge("relative", containerClassName)}>
      <Select>
        <SelectTrigger className={twMerge(className)}>
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem
                className="hover:bg-gray-100"
                value={filter.value}
                key={filter.name}
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
