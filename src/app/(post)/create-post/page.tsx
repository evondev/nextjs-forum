import Post from "@/components/forms/Post";
import { getAllTopics } from "@/lib/actions/topic.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function CreatePost() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const mongoUser = await getUserById({ userId });
  const topics = await getAllTopics();

  return (
    <div className="py-5">
      <Post topics={topics || []} userId={JSON.stringify(mongoUser._id)} />
    </div>
  );
}

export default CreatePost;
