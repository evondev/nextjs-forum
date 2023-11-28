"use client";
import { handlePostVote } from "@/lib/actions/post.action";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import IconThumbDown from "../icons/IconThumbDown";
import IconThumbUp from "../icons/IconThumbUp";
interface VotesProps {
  type: "post" | "comment";
  itemId: string;
  userId: string;
  votes: number;
  hasVoted: boolean;
}
const Votes = ({ type, itemId, userId, votes, hasVoted }: VotesProps) => {
  const buttonClasses =
    "items-center flex justify-center gap-1 font-semibold w-5 h-5 rounded-full border hover:bg-gray-100";
  const pathname = usePathname();
  const handleVote = async (action: "upvote" | "downvote") => {
    if (!userId) return;
    if (action === "upvote") {
      if (type === "post") {
        await handlePostVote({
          postId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasVoted,
          action,
          path: pathname,
        });
      } else if (type === "comment") {
        // await upvoteComment({
        //   commentId: JSON.parse(itemId),
        //   userId: JSON.parse(userId),
        //   hasUpvoted,
        //   hasDownvoted,
        //   path: pathname,
        // });
      }
      toast.success("Upvoted successfully");
    }
    if (action === "downvote") {
      if (type === "post") {
        await handlePostVote({
          postId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          action,
          hasVoted,
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
      toast.success("Downvoted successfully");
    }
  };
  return (
    <div className="flex items-center flex-col gap-2">
      <button
        type="button"
        className={twMerge(buttonClasses)}
        onClick={() => handleVote("upvote")}
      >
        <IconThumbUp />
      </button>
      <span className="text-sm font-medium">0</span>
      <button
        type="button"
        className={twMerge(buttonClasses)}
        onClick={() => handleVote("downvote")}
      >
        <IconThumbDown />
      </button>
    </div>
  );
};

export default Votes;
