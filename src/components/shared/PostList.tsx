import PostCard from "../cards/PostCard";

const PostList = ({ posts, userId }: { posts: any[]; userId: string }) => {
  if (!posts || posts.length <= 0 || !userId) return null;
  return (
    <div className="p-5 bgWhite_darkBgDark3 rounded-lg">
      <h2 className="text-lg font-bold mb-5">Latest Discussions</h2>
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
