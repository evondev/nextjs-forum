"use server";
import Post from "@/database/post.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { CreatePostParams, GetPostParams } from "./shared.types";

export async function getPosts(params: GetPostParams) {
  try {
    connectToDatabase();
    const posts = await Post.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      });
    return {
      posts,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function createPost({
  title,
  content,
  tags,
  author,
  path,
}: CreatePostParams) {
  try {
    connectToDatabase();
    const post = await Post.create({
      title,
      content,
      author,
    });
    const tagDocuments = [];
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { posts: post._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Post.findByIdAndUpdate(post._id, {
      $push: { tags: { $each: tagDocuments } },
    });
    revalidatePath(path || "/");
  } catch (error) {
    console.log("file: post.action.ts:41 ~ error:", error);
  }
}
