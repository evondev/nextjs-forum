"use client";
import { followUser } from "@/lib/actions/user.action";
import Image from "next/image";
import Link from "next/link";
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
    <Link
      href={`/profile/${user.clerkId}`}
      className="p-5 rounded-lg bg-white shadow-sm flex flex-col items-center text-center"
    >
      <div className="w-20 h-20 rounded-full bg-gray-100 mb-2 relative">
        <Image
          src={user.avatar}
          fill
          alt=""
          className="w-full h-full object-cover rounded-full"
        ></Image>
      </div>
      <h3 className="font-bold text-xl">{user.name}</h3>
      <p className="text-sm text-gray-500 mb-5">
        @{user.username || "anonymous"}
      </p>
      <button
        className={twMerge(
          "p-3 flex items-center justify-center text-white font-semibold w-full rounded-md",
          isFollowed ? "pointer-events-none bg-gray-300" : "bg-secondary"
        )}
        onClick={() => handleFollowUser(user._id)}
      >
        {isFollowed ? "Followed" : "Follow"}
      </button>
    </Link>
  );
}

export default UserCard;
