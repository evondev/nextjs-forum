"use server";

import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagParams } from "./shared.types";

export async function getTopInteractedTags(params: {
  userId: string;
  limit?: number;
}) {
  try {
    connectToDatabase();
    const { userId, limit = 3 } = params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
  } catch (error) {}
}
export async function getAllTags(params: GetAllTagParams): Promise<
  | {
      name: string;
      _id: string;
      posts: any[];
    }[]
  | undefined
> {
  try {
    connectToDatabase();
    const { page = 1, pageSize = 10, filter, searchQuery } = params;
    const tags = await Tag.find({});
    return tags;
  } catch (error) {}
}
