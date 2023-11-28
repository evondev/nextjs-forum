"use server";
import Post from "@/database/post.model";
import Topic from "@/database/topic.model";
import { connectToDatabase } from "../mongoose";
import { CreateTopicParams } from "./shared.types";

export async function createTopic(params: CreateTopicParams) {
  try {
    connectToDatabase();
    await Topic.create({
      ...params,
    });
  } catch (error) {
    console.log(error);
  }
}
export async function getAllTopics(): Promise<CreateTopicParams[] | undefined> {
  try {
    connectToDatabase();
    const topics = await Topic.find();
    // count posts for each topic and return
    const topicsWithPostCount = await Promise.all(
      topics.map(async (topic) => {
        const postCount = await Post.countDocuments({ topic: topic._id });
        return {
          ...topic.toObject(),
          postCount,
        };
      })
    );
    return topicsWithPostCount;
  } catch (error) {
    console.log(error);
  }
}
