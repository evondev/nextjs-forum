"use server";
import Post from "@/database/post.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreatePostParams,
  GetPostByIdParams,
  GetPostByUserIdParams,
  GetPostParams,
  PostVoteParams,
} from "./shared.types";

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
  cover,
}: CreatePostParams) {
  try {
    connectToDatabase();
    const post = await Post.create({
      title,
      content,
      author,
      cover:
        cover ||
        "https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=5047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
export async function getPostById(params: GetPostByIdParams) {
  try {
    connectToDatabase();
    const post = await Post.findById(params.postId)
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name email avatar username bio posts",
      });
    // update post views count when visit
    await Post.findByIdAndUpdate(params.postId, {
      $inc: { views: 1 },
    });
    return post;
  } catch (error) {
    console.log(error);
  }
}
export async function getPostsByUserId(params: GetPostByUserIdParams) {
  try {
    connectToDatabase();
    const posts = await Post.find({ author: params.userId })
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "username name",
      });
    return posts;
  } catch (error) {
    console.log(error);
  }
}
export async function upvotePost(params: PostVoteParams) {
  try {
    connectToDatabase();
    const { postId, userId, hasUpvoted, hasDownvoted, path } = params;
    let updateQuery = {};
    if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownvoted) {
      updateQuery = {
        $pull: {
          downvotes: userId,
        },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }
    const post = await Post.findByIdAndUpdate(postId, updateQuery, {
      new: true,
    });
    if (!post) {
      throw new Error("Post not found");
    }
    // Increment author reputation
    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}
export async function downvotePost(params: PostVoteParams) {
  try {
    connectToDatabase();
    const { postId, userId, hasUpvoted, hasDownvoted, path } = params;
    let updateQuery = {};
    if (hasDownvoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasUpvoted) {
      updateQuery = {
        $pull: {
          upvotes: userId,
        },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }
    const post = await Post.findByIdAndUpdate(postId, updateQuery, {
      new: true,
    });
    if (!post) {
      throw new Error("Post not found");
    }
    // Increment author reputation
    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}
export async function likedPost(params: any) {
  try {
    connectToDatabase();
    const { postId, userId, hasLiked, path } = params;
    let updateQuery = {};
    if (hasLiked) {
      updateQuery = { $pull: { likes: userId } };
      await User.findByIdAndUpdate(userId, {
        $pull: { liked: postId },
      });
    } else {
      updateQuery = { $addToSet: { likes: userId } };
      await User.findByIdAndUpdate(userId, {
        $push: { liked: postId },
      });
    }
    const post = await Post.findByIdAndUpdate(postId, updateQuery, {
      new: true,
    });
    if (!post) {
      throw new Error("Post not found");
    }
    // Increment author reputation
    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}
export async function getPostsByLikedUser() {
  try {
    connectToDatabase();
    const posts = await Post.find({ likes: { $exists: true, $ne: [] } })
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "username name",
      });
    return posts;
  } catch (error) {
    console.log(error);
  }
}
