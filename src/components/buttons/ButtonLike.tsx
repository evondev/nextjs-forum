"use client";
import { handleLikePost } from "@/lib/actions/post.action";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import IconHeart from "../icons/IconHeart";
interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  likes: any[];
  postId: string;
  userId: string;
}
const ButtonLike = ({ className, postId, userId, likes, ...rest }: Props) => {
  const pathname = usePathname();
  const onClick = async () => {
    if (!userId) return;
    await handleLikePost({
      postId,
      userId,
      hasLiked: likes?.includes(userId),
      path: pathname,
    });
  };
  const isLiked = likes?.includes(userId);
  return (
    <button
      className={twMerge(
        "w-8 h-8 p-1 flex items-center justify-center rounded-full",
        className,
        isLiked ? "bg-red-400 bg-opacity-20" : "bg-gray-100 hover:bg-gray-200"
      )}
      onClick={onClick}
      {...rest}
    >
      <IconHeart fill={isLiked} />
    </button>
  );
};

export default ButtonLike;
