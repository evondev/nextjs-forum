"use server";
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
    return topics;
  } catch (error) {
    console.log(error);
  }
}
