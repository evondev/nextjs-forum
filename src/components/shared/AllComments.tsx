import { getComments } from "@/lib/actions/comment.action";
import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import IconDate from "../icons/IconDate";
import MetaItem from "./MetaItem";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
interface AllCommentsProps {
  postId: string;
  userId: string;
  totalComments: number;
  page?: number;
  filter?: number;
}
const AllComments = async ({
  postId,
  userId,
  totalComments,
}: AllCommentsProps) => {
  const allComments = await getComments({
    postId,
  });
  return (
    <div className="mt-5">
      <h3 className="font-bold text-lg flex items-center gap-2 mb-5">
        Replies
        <span className="inline-block px-5 py-1 rounded-md bg-primary bg-opacity-10">
          {totalComments}
        </span>
      </h3>
      <div className="comment-list flex flex-col gap-10">
        {allComments &&
          allComments.length > 0 &&
          allComments.map((comment) => (
            <div key={comment._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-5 mb-5">
                  <Link
                    href={`/profile/${comment.author.clerkId}`}
                    className="flex-shrink-0 block"
                  >
                    <Image
                      src={comment.author.avatar}
                      alt=""
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                  </Link>
                  <div>
                    <h3 className="font-bold mb-1">
                      {comment.author.username}
                    </h3>
                    <div className="text-sm text-secondary-color-3 mb-5">
                      User Experience Designer
                    </div>
                    <ParseHTML data={comment.content} />
                    <div className="flex items-center gap-5">
                      <MetaItem
                        icon={<IconDate className="w-4 h-4"></IconDate>}
                        text={<>{getTimestamp(comment?.createdAt)}</>}
                      />
                    </div>
                  </div>
                </div>
                <div className="items-center gap-2 flex-shrink-0 hidden lg:flex">
                  <Votes
                    type="comment"
                    votes={comment?.votes?.length}
                    hasVoted={comment?.votes?.includes(userId)}
                    userId={JSON.stringify(userId)}
                    itemId={JSON.stringify(comment._id)}
                  ></Votes>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllComments;
