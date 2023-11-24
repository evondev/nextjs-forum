import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
interface UserWidgetProps {
  user: {
    avatar: string;
    username: string;
    bio: string;
    joinedAt: Date;
  };
}
const UserWidget = ({ user }: UserWidgetProps) => {
  console.log("file: UserWidget.tsx:13 ~ UserWidget ~ user:", user);
  return (
    <div className="bgWhite_darkBgDark3 rounded-lg p-5 flex flex-col items-center">
      <Image
        width={80}
        height={80}
        className="w-20 h-20 rounded-full bg-gray-100 mb-3"
        alt=""
        src={user?.avatar}
      ></Image>
      <h3 className="text-xl font-semibold">{user?.username}</h3>
      <p className="text-sm text-secondary-color-3 mb-5">{user?.bio}</p>
      <Button className="text-white p-3 w-full mb-5">Follow</Button>
      <p className="text-secondary-color-3 text-sm">
        joined {user?.joinedAt ? getTimestamp(user?.joinedAt) : "long time ago"}
      </p>
    </div>
  );
};

export default UserWidget;
