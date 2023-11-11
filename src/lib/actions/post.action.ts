"use server";
import Post from "@/database/post.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
interface Props {
  title: string;
  content: string;
  tags: string[];
  author: string;
  path?: string;
}
export async function createPost({
  title,
  content,
  tags,
  author,
  path,
}: Props) {
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
  } catch (error) {}
}
