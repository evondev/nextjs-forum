import UserCard from "@/components/cards/UserCard";
import Search from "@/components/shared/search/Search";
import { getAllUsers, getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

async function UsersPage() {
  const { userId } = auth();
  const users = await getAllUsers({});
  const userInfo = await getUserById({ userId: userId || "" });
  const filteredUsers = users?.filter((user) => user.clerkId !== userId);
  return (
    <div>
      <h1 className="font-bold text-3xl mb-5">All users</h1>
      <Search
        route="/users"
        placeholder="Search users..."
        className="flex-1"
      ></Search>
      <div className="grid grid-cols-3 gap-5 py-10">
        {filteredUsers &&
          filteredUsers.length > 0 &&
          filteredUsers.map((user, index) => (
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
