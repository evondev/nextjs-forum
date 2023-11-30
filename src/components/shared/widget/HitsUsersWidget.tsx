import Image from "next/image";
import Link from "next/link";
import FollowButton from "../FollowButton";
import HeadingWidget from "../HeadingWidget";

const HitsUsersWidget = ({
  users,
  userId,
}: {
  users?: any[];
  userId?: string;
}) => {
  if (!users || users.length <= 0) return null;
  return (
    <div className="p-5 bgWhite_darkBgDark3 rounded-lg">
      <div className="flex items-center justify-between mb-5">
        <HeadingWidget>Hit Users</HeadingWidget>
        <Link href="/users" className="font-semibold text-primary text-sm">
          All Users
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        {users.map((item, index) => (
          <HitsUserItem
            item={item}
            hasFollowing={item?.followers.includes(userId)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
const HitsUserItem = ({
  item,
  hasFollowing,
}: {
  item: any;
  hasFollowing: boolean;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={item?.avatar}
          width={40}
          height={40}
          className="rounded-full object-contain"
          alt="avatar"
        ></Image>
        <div className="flex flex-col">
          <h4 className="font-semibold">{item?.name}</h4>
          <span className="text-sm text-secondary-color-3">
            @{item?.username}
          </span>
        </div>
      </div>
      <FollowButton
        userId={item?._id.toString()}
        hasFollowing={hasFollowing}
      ></FollowButton>
    </div>
  );
};

export default HitsUsersWidget;
