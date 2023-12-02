import IconHeart from "@/components/icons/IconHeart";
import LocalSearch from "@/components/shared/LocalSearch";
import PostList from "@/components/shared/PostList";
import { getPosts } from "@/lib/actions/post.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

const LikedPage = async () => {
  const { userId: clerkId } = auth();
  let mongoUser: any;
  if (clerkId) {
    mongoUser = await getUserById({
      userId: clerkId,
    });
  }
  const results = await getPosts({
    isLiked: true,
    userId: mongoUser?._id,
  });
  return (
    <div>
      <h1 className="text-2xl font-bold capitalize mb-10 flex items-center gap-2">
        <IconHeart className="w-8 h-8" fill />
        Liked posts
      </h1>
      <LocalSearch />
      <PostList
        posts={results?.posts || []}
        userId={JSON.stringify(mongoUser?._id)}
        title=""
        mongoUser={JSON.stringify(mongoUser)}
      />
    </div>
  );
};

export default LikedPage;
