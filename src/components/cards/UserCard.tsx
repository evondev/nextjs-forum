"use client";
import { followUser } from "@/lib/actions/user.action";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

function UserCard({ user, isFollowed }: { user: any; isFollowed?: boolean }) {
  console.log("file: UserCard.tsx:7 ~ UserCard ~ isFollowed:", isFollowed);
  const handleFollowUser = (userId: string) => {
    followUser(userId);
  };
  return (
    <div className="p-5 rounded-lg bg-white shadow-sm flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 mb-2 relative">
        <Image
          src={user.avatar}
          fill
          alt=""
          className="w-full h-full object-cover rounded-full"
        ></Image>
      </div>
      <h3 className="font-bold text-xl">{user.name}</h3>
      <p className="text-sm text-gray-500 mb-5">User Interface Designer</p>
      <button
        className={twMerge(
          "p-3 flex items-center justify-center text-white font-semibold w-full rounded-md",
          isFollowed ? "pointer-events-none bg-gray-300" : "bg-secondary"
        )}
        onClick={() => handleFollowUser(user._id)}
      >
        {isFollowed ? "Followed" : "Follow"}
      </button>
    </div>
  );
}

export default UserCard;
