"use client";
import Image from "next/image";
import Link from "next/link";
import FollowButton from "../shared/FollowButton";
interface UserCardProps {
  user: {
    _id: string;
    clerkId: string;
    avatar: string;
    name: string;
    username: string;
    followers: string[];
  };
  hasFollowing: boolean;
}
function UserCard({ user, hasFollowing }: UserCardProps) {
  return (
    <div className="flex items-center gap-2 justify-between">
      <Link href={`/user/${user._id}`} className="flex items-center gap-3">
        <Image
          src={user.avatar}
          alt=""
          width={40}
          height={40}
          className="w-10 h-10 object-cover rounded-full"
        ></Image>
        <div>
          <h3 className="font-bold leading-none">{user?.name}</h3>
          <span className="text-sm text-secondary-color-3">
            @{user?.username}
          </span>
        </div>
      </Link>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="font-medium max-sm:hidden">
          {user?.followers.length} Followers
        </div>
        <FollowButton
          userId={user._id}
          hasFollowing={hasFollowing}
        ></FollowButton>
      </div>
    </div>
  );
}

export default UserCard;
