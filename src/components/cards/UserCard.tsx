"use client";
import { followUser } from "@/lib/actions/user.action";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
interface UserCardProps {
  user: {
    _id: string;
    clerkId: string;
    avatar: string;
    name: string;
    username: string;
  };
  isFollowed?: boolean;
}
function UserCard({ user, isFollowed }: UserCardProps) {
  const handleFollowUser = (userId: string) => {
    followUser(userId);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={user.avatar}
          alt=""
          width={80}
          height={80}
          className="w-[60px] h-[60px] object-cover rounded-full"
        ></Image>
        <div>
          <h3 className="font-bold text-lg">{user?.name}</h3>
          <span className="text-sm text-secondary-color-3">
            @{user?.username}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="font-medium">3.1k Followers</div>
        <button
          className={twMerge(
            "p-3 flex items-center justify-center text-white font-semibold w-[140px] rounded-md border",
            isFollowed
              ? "pointer-events-none bg-secondary border-none"
              : "text-secondary border-secondary"
          )}
          onClick={() => handleFollowUser(user._id)}
        >
          {isFollowed ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
}

export default UserCard;
