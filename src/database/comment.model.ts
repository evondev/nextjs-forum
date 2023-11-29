import { Document, Schema, model, models } from "mongoose";

export interface IComment extends Document {
  post: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  content: string;
  points: number;
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  createdAt: Date;
}
const CommentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  upVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downVotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Comment = models.Comment || model("Comment", CommentSchema);
export default Comment;
