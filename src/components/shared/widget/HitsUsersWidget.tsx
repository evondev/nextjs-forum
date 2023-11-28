import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeadingWidget from "../HeadingWidget";

const HitsUsersWidget = ({ users }: { users?: any[] }) => {
  if (!users || users.length <= 0) return null;
  return (
    <div className="p-5 bg-white rounded-lg">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold">Hit Users</h3>
        <Link href="/users" className="font-semibold text-primary text-sm">
          All Users
        </Link>
      </div>
      <div className="flex flex-col gap-5">
        {users.map((item, index) => (
          <HitsUserItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
};
const HitsUserItem = ({ item }: { item: any }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100"></div>
        <div className="flex flex-col">
          <HeadingWidget>{item?.name}</HeadingWidget>
          <span className="text-sm text-secondary-color-3">
            @{item?.username}
          </span>
        </div>
      </div>
      <Button variant="outline" className="text-secondary border-secondary">
        + Follow
      </Button>
    </div>
  );
};

export default HitsUsersWidget;
