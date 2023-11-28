import { Document, Schema, model, models } from "mongoose";
export interface ITopic extends Document {
  name: string;
  value: string;
  icon: string;
  desc: string;
  createdAt: Date;
}
const TopicSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    unique: true,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Topic = models.Topic || model("Topic", TopicSchema);
export default Topic;
