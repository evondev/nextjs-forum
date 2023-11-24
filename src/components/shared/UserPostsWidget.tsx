const UserPostsWidget = () => {
  return (
    <div className="bgWhite_darkBgDark3 rounded-lg p-5">
      <h2 className="font-semibold text-lg pb-5 mb-5 border-b border-b-gray-100">
        More posts from Evondev
      </h2>
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="text-sm font-medium mb-1">
            Self-Taught Developer Journal, Day 51: TOP Building Rock Paper
            Scissors UI cont.
          </h3>
          <div className="flex flex-wrap gap-2 text-sm text-secondary-color-3">
            <span>#evondev</span>
            <span>#css</span>
            <span>#scss</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostsWidget;
