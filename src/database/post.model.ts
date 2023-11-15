import { Document, Schema, model, models } from "mongoose";
export interface IPost extends Document {
  title: string;
  content: string;
  avatar: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  likes: Schema.Types.ObjectId[];
  saves: Schema.Types.ObjectId[];
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  comments: Schema.Types.ObjectId[];
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
  avatar: {
    type: String,
    default: "https://source.unsplash.com/random",
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
  upvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downvotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
