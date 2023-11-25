"use client";
import { downvoteComment, upvoteComment } from "@/lib/actions/comment.action";
import { downvotePost, upvotePost } from "@/lib/actions/post.action";
import { formatAndDivideNumber } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import IconThumbDown from "../icons/IconThumbDown";
import IconThumbUp from "../icons/IconThumbUp";
interface VotesProps {
  type: "post" | "comment";
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
}
const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasUpvoted,
  hasDownvoted,
}: VotesProps) => {
  const buttonClasses = "items-center flex gap-1 font-semibold";
  const pathname = usePathname();
  const handleVote = async (action: "upvote" | "downvote") => {
    if (!userId) return;
    if (action === "upvote") {
      if (type === "post") {
        await upvotePost({
          postId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      } else if (type === "comment") {
        await upvoteComment({
          commentId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      }
      toast.success("Upvoted successfully");
    }
    if (action === "downvote") {
      if (type === "post") {
        await downvotePost({
          postId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      } else if (type === "comment") {
        await downvoteComment({
          commentId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      }
      toast.success("Downvoted successfully");
    }
  };
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className={twMerge(
          buttonClasses,
          hasUpvoted ? "text-green-500" : "text-secondary-color-3"
        )}
        onClick={() => handleVote("upvote")}
      >
        <IconThumbUp />
        <span className="w-5">{formatAndDivideNumber(upvotes)}</span>
      </button>
      <button
        type="button"
        className={twMerge(
          buttonClasses,
          hasDownvoted ? "text-red-500" : "text-secondary-color-3"
        )}
        onClick={() => handleVote("downvote")}
      >
        <IconThumbDown />
        <span className="w-5">{formatAndDivideNumber(downvotes)}</span>
      </button>
    </div>
  );
};

export default Votes;
