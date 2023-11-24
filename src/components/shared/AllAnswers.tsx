import { getAllCommentsByPostId } from "@/lib/actions/comment.action";
import Image from "next/image";
import ParseHTML from "./ParseHTML";
interface AllAnswersProps {
  postId: string;
  userId: string;
  totalPosts: number;
  page?: number;
  filter?: number;
}
const AllAnswers = async ({ postId }: AllAnswersProps) => {
  const allComments = await getAllCommentsByPostId({
    postId,
  });
  return (
    <div className="comment-list mt-10 flex flex-col gap-10">
      {allComments &&
        allComments.length > 0 &&
        allComments.map((comment) => (
          <div key={comment._id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5 mb-5">
                <div className="flex-shrink-0">
                  <Image
                    src={comment.author.avatar}
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {comment.author.username}
                  </h3>
                  <div className="text-sm text-secondary-color-3">
                    User Experience Designer
                  </div>
                </div>
              </div>
            </div>
            <ParseHTML data={comment.content} />
          </div>
        ))}
    </div>
  );
};

export default AllAnswers;
