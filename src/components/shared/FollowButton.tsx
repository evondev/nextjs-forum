"use client";
import { followUser } from "@/lib/actions/user.action";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
interface FollowButtonProps {
  hasFollowing: boolean;
  userId: string;
}
const FollowButton = ({ hasFollowing, userId }: FollowButtonProps) => {
  const handleFollowUser = (userId: string) => {
    followUser({
      userId,
      hasFollowing,
      followerId: userId,
    });
  };
  return (
    <Button
      variant="ghost"
      className={twMerge(
        "p-3 flex items-center justify-center text-white font-semibold w-[100px] rounded-md border flex-shrink-0",
        hasFollowing
          ? "bg-secondary border-none"
          : "text-secondary border-secondary"
      )}
      onClick={() => handleFollowUser(userId)}
    >
      {hasFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
