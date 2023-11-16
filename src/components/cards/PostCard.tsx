/* eslint-disable @next/next/no-img-element */
interface PostProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  views: number;
  createdAt: Date;
  clerkId?: string | null;
}

function PostCard({
  clerkId,
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  createdAt,
}: PostProps) {
  return (
    <div className="bg-white p-5 rounded-2xl flex items-center gap-5 relative dark:bg-dark3">
      <img
        src="https://plus.unsplash.com/premium_photo-1696879453950-a121fad02642?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY5OTk4MjY4MA&ixlib=rb-4.0.3&q=80&w=1080"
        alt=""
        className="w-[156px] aspect-square rounded-2xl object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <h2 className="text-lg font-semibold max-w-[90%] mb-2.5">{title}</h2>
        <div className="flex items-center gap-2.5 mb-8">
          {tags.map((item: any, index: number) => (
            <div
              key={index}
              className="py-1 px-2.5 rounded-full bg-secondary-color-6 text-secondary-color-4 text-xs dark:bg-dark4 dark:text-secondary-color-5"
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100"></div>
            <div>
              <h3 className="text-secondary-color-2 font-semibold text-sm dark:text-secondary-color-6">
                Pavel Gvay
              </h3>
              <span className="text-secondary-color-3 text-xs">
                3 weeks ago
              </span>
            </div>
          </div>
          <div className="flex items-center gap-10 text-secondary-color-3 text-sm dark:text-secondary-color-5">
            <div>651,324 Views</div>
            <div>36,6545 Likes</div>
            <div>56 comments</div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary-color-6 absolute right-5 top-5 dark:bg-dark4"
      >
        <svg
          width={20}
          height={18}
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.28472 0.286333C0.582052 1.41944 -0.738149 5.2488 0.391497 8.59911C2.20862 13.9716 10.0014 18 10.0014 18C10.0014 18 17.8521 13.9096 19.6102 8.59911C20.7388 5.2488 19.4102 1.41944 15.7075 0.286333C13.762 -0.306722 11.5332 0.0733134 10.0014 1.19842C8.38219 0.0413105 6.23239 -0.310722 4.28472 0.286333ZM13.7574 3.27341C13.3561 3.1707 12.9476 3.41274 12.8448 3.81402C12.7421 4.2153 12.9842 4.62386 13.3855 4.72656C14.768 5.08041 15.5877 6.00902 15.6825 6.93365C15.7247 7.3457 16.093 7.64547 16.5051 7.60321C16.9171 7.56095 17.2169 7.19266 17.1747 6.78061C16.9982 5.06044 15.5644 3.73589 13.7574 3.27341Z"
            fill="#C5D0E6"
          />
        </svg>
      </button>
    </div>
  );
}

export default PostCard;
