"use client";
import { upvoteComment } from "@/lib/actions/comment.action";
import { handleDownvote, handleUpvote } from "@/lib/actions/post.action";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import IconThumbDown from "../icons/IconThumbDown";
import IconThumbUp from "../icons/IconThumbUp";
interface VotesProps {
  type: "post" | "comment";
  itemId: string;
  userId?: string;
  points: number;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
}
const Votes = ({
  type,
  itemId,
  userId,
  points,
  hasUpvoted,
  hasDownvoted,
}: VotesProps) => {
  const buttonClasses =
    "items-center flex justify-center gap-1 font-semibold w-5 h-5 rounded-full border";
  const pathname = usePathname();
  const handleVote = async (action: "upvote" | "downvote") => {
    if (!userId) return;
    if (action === "upvote") {
      if (type === "post") {
        await handleUpvote({
          postId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasDownvoted,
          hasUpvoted,
          path: pathname,
        });
      } else if (type === "comment") {
        await upvoteComment({
          commentId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasDownvoted,
          hasUpvoted,
          path: pathname,
        });
      }
    }
    if (action === "downvote") {
      if (type === "post") {
        await handleDownvote({
          postId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasDownvoted,
          hasUpvoted,
          path: pathname,
        });
      } else if (type === "comment") {
        // await downvoteComment({
        //   commentId: JSON.parse(itemId),
        //   userId: JSON.parse(userId),
        //   hasUpvoted,
        //   hasDownvoted,
        //   path: pathname,
        // });
      }
    }
  };
  return (
    <div className="flex items-center flex-col gap-2">
      <button
        type="button"
        className={twMerge(
          buttonClasses,
          hasUpvoted ? "text-white bg-primary border-primary" : ""
        )}
        onClick={() => handleVote("upvote")}
      >
        <IconThumbUp />
      </button>
      <span className="text-sm font-medium">{points || 0}</span>
      <button
        type="button"
        className={twMerge(
          buttonClasses,
          hasDownvoted ? "text-white bg-primary border-primary" : ""
        )}
        onClick={() => handleVote("downvote")}
      >
        <IconThumbDown />
      </button>
    </div>
  );
};

export default Votes;
