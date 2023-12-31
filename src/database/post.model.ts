import { Document, Schema, model, models } from "mongoose";
export interface IPost extends Document {
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  likes: Schema.Types.ObjectId[];
  saves: Schema.Types.ObjectId[];
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  points: number;
  author: Schema.Types.ObjectId;
  topic: Schema.Types.ObjectId;
  comments: Schema.Types.ObjectId[];
  desc: string;
  createdAt: Date;
}
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  points: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  saves: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
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
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = models.Post || model("Post", PostSchema);
export default Post;
