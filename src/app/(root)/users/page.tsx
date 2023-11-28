import UserCard from "@/components/cards/UserCard";
import { getAllUsers, getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

async function UsersPage() {
  const { userId } = auth();
  const users = await getAllUsers({});
  const userInfo = await getUserById({ userId: userId || "" });
  return (
    <div className="grid grid-cols-[1fr_320px] gap-5">
      <div className="p-5 bg-white rounded-lg flex flex-col gap-5">
        {users &&
          users.length > 0 &&
          users.map((user, index) => (
            <UserCard
              key={index}
              user={user}
              isFollowed={userInfo?.following?.includes(user._id.toString())}
            ></UserCard>
          ))}
      </div>
    </div>
  );
}

export default UsersPage;
