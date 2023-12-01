import MyProfile from "@/components/user/MyProfile";
import { countPostByUserId } from "@/lib/actions/post.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Suspense } from "react";

const MyProfilePage = async () => {
  const { userId: clerkId } = auth();
  let mongoUser;
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }
  if (!mongoUser) return null;
  const postCount = countPostByUserId({ userId: mongoUser._id });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyProfile
        mongoUser={JSON.stringify(mongoUser)}
        postCount={postCount}
      ></MyProfile>
    </Suspense>
  );
};

export default MyProfilePage;
