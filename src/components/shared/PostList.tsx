import PostCard from "../cards/PostCard";
import NoResults from "./NoResults";
interface PostListProps {
  posts: any[];
  userId: string;
  title?: string;
}
const PostList = ({
  posts,
  userId,
  title = "Latest Discussions",
}: PostListProps) => {
  if (!posts || posts.length <= 0)
    return (
      <NoResults
        title="There’s no discussion to show"
        description="🚀 Ask a Question and kickstart the discussion."
        link="/create-post"
        linkTitle="Ask a Question"
      />
    );
  return (
    <div className="p-5 bgWhite_darkBgDark3 rounded-lg">
      {title && <h2 className="text-lg font-bold mb-5">{title}</h2>}
      <div className="flex flex-col gap-10">
        {posts?.map((post, index) => (
          <PostCard
            key={post._id}
            _id={post._id}
            title={post.title}
            author={post.author}
            likes={post.likes}
            comments={post.comments}
            points={post.points}
            createdAt={post.createdAt}
            userId={userId}
            topic={post.topic}
            upVotes={post.upVotes}
            downVotes={post.downVotes}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;
