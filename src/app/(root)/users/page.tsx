import UserCard from "@/components/cards/UserCard";
import LocalSearch from "@/components/shared/LocalSearch";
import { getAllUsers, getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

async function UsersPage() {
  const { userId: clerkId } = auth();
  const userInfo = await getUserById({ userId: clerkId || "" });
  const users = await getAllUsers({});
  return (
    <div className="grid grid-cols-[1fr_320px] gap-5">
      <div>
        <LocalSearch placeholder="Find member" />
        <div className="p-5 bg-white rounded-lg flex flex-col gap-5">
          {users &&
            users.length > 0 &&
            users.map((user, index) => (
              <UserCard
                key={index}
                user={JSON.parse(JSON.stringify(user))}
                hasFollowing={userInfo?.following?.includes(
                  user._id.toString()
                )}
              ></UserCard>
            ))}
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
