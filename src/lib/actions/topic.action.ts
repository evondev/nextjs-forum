"use server";
import Post from "@/database/post.model";
import Topic from "@/database/topic.model";
import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import { CreateTopicParams, GetTopicParams } from "./shared.types";

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
export async function getAllTopics(
  params: GetTopicParams = {}
): Promise<CreateTopicParams[] | undefined> {
  try {
    connectToDatabase();
    const { searchQuery, page = 1, pageSize = 10 } = params;
    const skip = (page - 1) * pageSize;
    let query: FilterQuery<typeof Topic> = {};
    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { desc: { $regex: searchQuery, $options: "i" } },
      ];
    }
    const topics = await Topic.find(query).limit(pageSize).skip(skip).sort({
      createdAt: -1,
    });
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
