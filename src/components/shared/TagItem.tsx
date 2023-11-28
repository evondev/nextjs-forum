import { twMerge } from "tailwind-merge";

const TagItem = ({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "py-1 px-2.5 rounded-full bg-secondary-color-6 text-secondary-color-4 text-sm font-medium dark:bg-dark4 dark:text-secondary-color-5",
        className
      )}
    >
      {name}
    </div>
  );
};

export default TagItem;
