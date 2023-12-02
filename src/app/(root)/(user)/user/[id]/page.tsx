import IconFacebook from "@/components/icons/IconFacebook";
import FollowButton from "@/components/shared/FollowButton";
import HeadingWidget from "@/components/shared/HeadingWidget";
import LocalSearch from "@/components/shared/LocalSearch";
import PostList from "@/components/shared/PostList";
import SocialIcon from "@/components/shared/SocialIcon";
import HitsUsersWidget from "@/components/shared/widget/HitsUsersWidget";
import UserMeta from "@/components/user/UserMeta";
import { getPosts } from "@/lib/actions/post.action";
import { getAllUsers, getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const UserDetailsPage = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const userProfile = await getUserById({
    userId: id,
  });
  if (!userProfile) return null;
  const { userId: clerkId } = auth();
  let mongoUser: any;
  if (clerkId) {
    mongoUser = await getUserById({
      userId: clerkId,
    });
  }
  const results = await getPosts({
    userId: id,
  });
  const users = await getAllUsers({});
  const postCount = results?.posts?.length;
  const userMetaList = [
    {
      icon: "👋",
      count: userProfile?.followers.length,
      title: "Followers",
    },
    {
      icon: "👉",
      count: userProfile?.following.length,
      title: "Following",
    },
    {
      icon: "👇",
      count: postCount,
      title: "Posts",
    },
  ];
  const hasFollowing = userProfile?.followers?.some(
    (item: any) => item._id.toString() === mongoUser?._id.toString()
  );
  return (
    <div className="">
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
            src={userProfile?.avatar}
            alt=""
            width={160}
            height={160}
            className="w-[160px] h-[160px] object-cover rounded-full -translate-y-1/2 border-4 border-white"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-xl">
              {userProfile.name} (@{userProfile.username})
            </h3>
            <h4 className="text-sm text-secondary-color-3 mb-2">
              {userProfile.bio}
            </h4>
            <FollowButton
              hasFollowing={hasFollowing}
              userId={userProfile?._id.toString()}
            />
            <div className="flex items-center gap-3  text-secondary-color-3 text-sm">
              <div className="flex items-center justify-center gap-1">
                <SocialIcon
                  url={userProfile?.socials?.facebook}
                  icon={<GlobeAltIcon className="w-6 h-6" />}
                  className="text-blue-400"
                ></SocialIcon>
                <SocialIcon
                  url={userProfile?.website}
                  icon={<IconFacebook />}
                  className="text-blue-600"
                ></SocialIcon>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {userMetaList.map((meta) => (
            <UserMeta
              key={meta.icon}
              icon={meta.icon}
              count={meta.count}
              title={meta.title}
            ></UserMeta>
          ))}
        </div>
      </div>
      <div className="mb-5"></div>
      <div className="grid grid-cols-[1fr_350px] gap-5">
        <div>
          {results?.posts && results?.posts.length > 0 && <LocalSearch />}
          <PostList userId={id} posts={results?.posts || []} title="" />
        </div>
        <div className="flex flex-col gap-5">
          <HitsUsersWidget
            users={users}
            userId={JSON.stringify(mongoUser?._id)}
          />
          <div className="p-5 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-5">
              <HeadingWidget>
                {userProfile?.followers.length} Followers
              </HeadingWidget>
              <Link
                href={`/followers/${userProfile?._id}`}
                className="font-semibold text-primary text-sm"
              >
                View All
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {userProfile?.followers.map(
                (item: { avatar: string; _id: string }) => (
                  <Link
                    href={`/user/${item._id}`}
                    key={item._id}
                    className="w-10 h-10 rounded-full bg-gray-100"
                  >
                    <Image
                      src={item.avatar}
                      alt=""
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
