"use client";
import { followUser } from "@/lib/actions/user.action";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
interface FollowButtonProps {
  hasFollowing: boolean;
  userId: string;
}
const FollowButton = ({ hasFollowing, userId }: FollowButtonProps) => {
  const pathname = usePathname();
  const handleFollowUser = async () => {
    await followUser({
      hasFollowing,
      followerId: userId,
      path: pathname,
    });
  };
  return (
    <Button
      variant="ghost"
      className={twMerge(
        "p-3 flex items-center justify-center text-white font-semibold w-[100px] rounded-md border flex-shrink-0 max-sm:text-sm max-sm:w-20",
        hasFollowing
          ? "bg-secondary border-none"
          : "text-secondary border-secondary"
      )}
      onClick={() => handleFollowUser()}
    >
      {hasFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
