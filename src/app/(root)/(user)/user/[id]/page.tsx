import FollowButton from "@/components/shared/FollowButton";
import HeadingWidget from "@/components/shared/HeadingWidget";
import LocalSearch from "@/components/shared/LocalSearch";
import PostList from "@/components/shared/PostList";
import HitsUsersWidget from "@/components/shared/widget/HitsUsersWidget";
import { getPosts } from "@/lib/actions/post.action";
import { getAllUsers, getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const UserDetailsPage = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const user = await getUserById({
    userId: id,
  });
  if (!user) return null;
  const { userId: clerkId } = auth();
  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({
      userId: clerkId,
    });
  }
  const results = await getPosts({
    userId: user?._id,
  });
  const users = await getAllUsers({});
  return (
    <div className="py-5">
      <div className="h-60 rounded-lg relative">
        <Image
          src="/images/banner.png"
          alt=""
          fill
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex items-center justify-between px-10">
        <div className="flex items-center gap-5">
          <Image
            src="https://source.unsplash.com/random"
            alt=""
            width={160}
            height={160}
            className="w-[160px] h-[160px] object-cover rounded-full -translate-y-1/2 border-4 border-white"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-xl">Omar Sulaiman</h3>
            <h4 className="text-sm text-secondary-color-3 mb-5">
              American Muslim scholar
            </h4>
            <div className="flex items-center gap-3">
              <FollowButton hasFollowing userId="" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gray-100 flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg">
              👋
            </div>
            <div>
              <h4 className="text-secondary-color-3">Followers</h4>
              <h5>1,233</h5>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-gray-100 flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg">
              👋
            </div>
            <div>
              <h4 className="text-secondary-color-3">Following</h4>
              <h5>1,233</h5>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-gray-100 flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg">
              👋
            </div>
            <div>
              <h4 className="text-secondary-color-3">Questions</h4>
              <h5>1,233</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5"></div>
      <div className="grid grid-cols-[1fr_350px] gap-5">
        <div>
          <LocalSearch />
          <PostList
            userId={mongoUser?._id.toString()}
            posts={results?.posts || []}
            title=""
          />
        </div>
        <div className="flex flex-col gap-5">
          <HitsUsersWidget users={users} />
          <div className="p-5 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-5">
              <HeadingWidget>2,322 Followers</HeadingWidget>
              <Link
                href={`/followers/${user?._id}`}
                className="font-semibold text-primary text-sm"
              >
                View All
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {Array(12)
                .fill(0)
                .map((item, index) => (
                  <div
                    className="w-10 h-10 rounded-full bg-gray-100"
                    key={index}
                  ></div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
