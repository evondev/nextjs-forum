import UserCard from "@/components/cards/UserCard";
import { getUserById, getUsers } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

async function UsersPage() {
  const { userId } = auth();
  const users = await getUsers();
  const userInfo = await getUserById({ userId: userId || "" });
  console.log("file: page.tsx:9 ~ UsersPage ~ userInfo:", userInfo);
  const filteredUsers = users?.filter((user) => user.clerkId !== userId);
  return (
    <div>
      <h1 className="font-bold text-3xl mb-5">All users</h1>
      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-4 rounded-lg border border-gray-200 outline-none focus:border-gray-300"
      />
      <div className="grid grid-cols-3 gap-5 py-10">
        {filteredUsers &&
          filteredUsers.length > 0 &&
          filteredUsers.map((user, index) => (
            <UserCard
              key={index}
              user={{
                avatar: user.avatar,
                _id: user._id.toString(),
                name: user.name,
              }}
              isFollowed={userInfo?.following?.includes(user._id.toString())}
            ></UserCard>
          ))}
      </div>
    </div>
  );
}

export default UsersPage;
