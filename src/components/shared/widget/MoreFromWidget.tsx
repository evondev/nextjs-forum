import HeadingWidget from "../HeadingWidget";
import PostWidgetItem from "../PostWidgetItem";
interface Props {
  user?: any;
  posts?: any[];
  mongoUser?: any;
}
const MoreFromWidget = ({ user, posts, mongoUser }: Props) => {
  if (!user || !posts || posts.length <= 0) return null;
  return (
    <div className="p-5 bg-white rounded-lg">
      <HeadingWidget>More by {user.username}</HeadingWidget>
      <div className="flex flex-col gap-5 mt-5">
        {posts.map((post, index) => (
          <PostWidgetItem
            mongoUser={mongoUser}
            author={user}
            post={post}
            key={index}
          ></PostWidgetItem>
        ))}
      </div>
    </div>
  );
};

export default MoreFromWidget;
