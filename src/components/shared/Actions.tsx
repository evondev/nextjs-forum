"use client";
import { likedPost } from "@/lib/actions/post.action";
import { usePathname } from "next/navigation";
import IconBookmark from "../icons/IconBookmark";
import IconHeart from "../icons/IconHeart";
interface ActionsProps {
  itemId: string;
  userId: string;
  hasLiked: boolean;
  hasSaved: boolean;
}
const Actions = ({ itemId, userId, hasLiked, hasSaved }: ActionsProps) => {
  const pathname = usePathname();
  const handleAction = async (action: "liked" | "saved") => {
    if (!userId) return;
    if (action === "liked") {
      await likedPost({
        postId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        hasLiked,
        path: pathname,
      });
    } else if (action === "saved") {
    }
  };
  return (
    <div className="absolute top-5 right-5 bg-white dark:bg-dark3 p-2 rounded-lg flex items-center gap-3">
      <button onClick={() => handleAction("liked")}>
        <IconHeart fill={hasLiked}></IconHeart>
      </button>
      <button onClick={() => handleAction("saved")}>
        <IconBookmark fill={hasSaved}></IconBookmark>
      </button>
    </div>
  );
};

export default Actions;
