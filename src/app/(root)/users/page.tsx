import UserCard from "@/components/cards/UserCard";
import LocalSearch from "@/components/shared/LocalSearch";
import HitsUsersWidget from "@/components/shared/widget/HitsUsersWidget";
import { getAllUsers, getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

async function UsersPage({ searchParams }: { searchParams: any }) {
  const { userId: clerkId } = auth();
  const userInfo = await getUserById({ userId: clerkId || "" });
  const users = await getAllUsers({
    searchQuery: searchParams?.search || "",
    page: searchParams.page ? +searchParams.page : 1,
  });
  const suggestedUsers = await getAllUsers({
    isFollowing: false,
  });
  return (
    <div className="grid xl:grid-cols-[1fr_320px] gap-5 items-start">
      <div>
        <LocalSearch placeholder="Find member" />
        <div className="p-5 bg-white rounded-lg flex flex-col gap-5 @container">
          {users &&
            users.length > 0 &&
            users.map((user, index) => {
              return (
                <UserCard
                  key={index}
                  user={JSON.parse(JSON.stringify(user))}
                  hasFollowing={user?.followers?.includes(userInfo._id)}
                ></UserCard>
              );
            })}
        </div>
      </div>
      <HitsUsersWidget
        title="Suggested Users"
        users={suggestedUsers}
        userId={JSON.stringify(userInfo?._id || "")}
      />
    </div>
  );
}

export default UsersPage;
