import { twMerge } from "tailwind-merge";

const HeadingWidget = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={twMerge("text-lg font-bold", className)}>{children}</h2>
  );
};

export default HeadingWidget;
