import IconComment from "@/components/icons/IconComment";
import IconDate from "@/components/icons/IconDate";
import IconHeart from "@/components/icons/IconHeart";
import MetaItem from "@/components/shared/MetaItem";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MyProfile from "@/components/user/MyProfile";
import { countPostByUserId, getPosts } from "@/lib/actions/post.action";
import { getUserById } from "@/lib/actions/user.action";
import { getTimestamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const MyProfilePage = async () => {
  const { userId: clerkId } = auth();
  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }
  if (!mongoUser) return null;
  const postCount = countPostByUserId({ userId: mongoUser._id });
  const results = await getPosts({ userId: mongoUser._id });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyProfile
        mongoUser={JSON.stringify(mongoUser)}
        postCount={postCount}
      ></MyProfile>
      <h2 className="text-lg font-bold mb-5">My posts</h2>
      <div className="grid lg:grid-cols-2 gap-5 lg:gap-10 mb-5">
        {results?.posts?.map((post: any) => (
          <Link
            href={`/post/${post._id}`}
            key={post._id.toString()}
            className="bg-white p-3 dark:bg-dark3 rounded block"
          >
            <h3 className="font-bold mb-2">{post.title}</h3>
            <div className="flex items-center gap-3">
              <MetaItem
                icon={<IconComment />}
                text={`${post.comments.length} comments`}
              />
              <MetaItem
                icon={<IconDate />}
                text={getTimestamp(post.createdAt)}
              />
              <MetaItem
                icon={<IconHeart className="w4 h-4" />}
                text={`${post.likes.length} likes`}
              />
            </div>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <h3 className="text-lg font-bold mb-5">Followers</h3>
          <div className="flex flex-wrap gap-3">
            {mongoUser?.followers?.map(
              (follower: { avatar: string; _id: string; username: string }) => (
                <Link
                  href={`/user/${follower._id}`}
                  key={follower._id.toString()}
                  className="relative block"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Image
                          src={follower.avatar}
                          alt=""
                          width={40}
                          height={40}
                          className="rounded-full w-10 h-10 object-cover"
                        />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white dark:bg-dark3">
                        <p>{follower.username}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              )
            )}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-5">Following</h3>
          <div className="flex flex-wrap gap-3">
            {mongoUser?.following?.map(
              (follower: { avatar: string; _id: string; username: string }) => (
                <Link
                  href={`/user/${follower._id}`}
                  key={follower._id.toString()}
                  className="relative block"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Image
                          src={follower.avatar}
                          alt=""
                          width={40}
                          height={40}
                          className="rounded-full w-10 h-10 object-cover"
                        />
                      </TooltipTrigger>
                      <TooltipContent className="bg-white dark:bg-dark3">
                        <p>{follower.username}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default MyProfilePage;
