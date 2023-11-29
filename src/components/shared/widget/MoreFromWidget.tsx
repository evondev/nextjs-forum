import HeadingWidget from "../HeadingWidget";
import PostWidgetItem from "../PostWidgetItem";

const MoreFromWidget = () => {
  return (
    <div className="p-5 bg-white rounded-lg">
      <HeadingWidget>More by Mark</HeadingWidget>
      <div className="flex flex-col gap-5 mt-5">
        {Array(5)
          .fill(0)
          .map((item, index) => (
            <PostWidgetItem key={index}></PostWidgetItem>
          ))}
      </div>
    </div>
  );
};

export default MoreFromWidget;
