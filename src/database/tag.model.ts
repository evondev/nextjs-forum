import { Document, Schema, model, models } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  posts: Schema.Types.ObjectId[];
  createdAt: Date;
}
const TagSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Tag = models.Tag || model("Tag", TagSchema);
export default Tag;
