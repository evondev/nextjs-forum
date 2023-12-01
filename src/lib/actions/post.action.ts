"use server";
import Post from "@/database/post.model";
import Tag from "@/database/tag.model";
import Topic from "@/database/topic.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreatePostParams,
  GetPostByIdParams,
  GetPostByUserIdParams,
  GetPostParams,
} from "./shared.types";

export async function getPosts(params: GetPostParams) {
  try {
    connectToDatabase();
    const {
      searchQuery,
      page = 1,
      pageSize = 20,
      sorted,
      topic,
      userId,
    } = params;
    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof Post> = {};
    if (userId) {
      query.author = userId;
    }
    // find posts by topicId
    if (topic) {
      query.topic = topic;
    }
    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } },
      ];
    }
    let sortOptions = {};
    switch (sorted) {
      case "popular":
        sortOptions = { votes: -1 };
        break;

      default:
        sortOptions = { createdAt: -1 };
        break;
    }
    const posts = await Post.find(query)
      .sort(sortOptions)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "topic",
        model: Topic,
      })
      .skip(skipAmount)
      .limit(pageSize);
    const totalPosts = await Post.countDocuments(query);
    const isNext = totalPosts > skipAmount + posts.length;

    return {
      posts,
      isNext,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function createPost({
  title,
  content,
  author,
  path,
  topic,
  desc,
}: CreatePostParams) {
  try {
    connectToDatabase();
    await Post.create({
      title,
      content,
      author,
      topic,
      desc,
    });
    // const tagDocuments = [];
    // for (const tag of tags) {
    //   const existingTag = await Tag.findOneAndUpdate(
    //     { name: { $regex: new RegExp(`^${tag}$`, "i") } },
    //     { $setOnInsert: { name: tag }, $push: { posts: post._id } },
    //     { upsert: true, new: true }
    //   );

    //   tagDocuments.push(existingTag._id);
    // }

    // await Post.findByIdAndUpdate(post._id, {
    //   $push: { tags: { $each: tagDocuments } },
    // });
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
        path: "topic",
        model: Topic,
      })
      .populate({
        path: "author",
        model: User,
      });
    return posts;
  } catch (error) {
    console.log(error);
  }
}
export async function handleUpvote(params: {
  postId: string;
  userId: string;
  path: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
}) {
  try {
    connectToDatabase();
    const { postId, userId, hasUpvoted, hasDownvoted, path } = params;
    let updateQuery = {};
    if (hasUpvoted) {
      updateQuery = { $pull: { upVotes: userId }, $inc: { points: -1 } };
    } else if (hasDownvoted) {
      updateQuery = {
        $pull: {
          downVotes: userId,
        },
        $push: { upVotes: userId },
        $inc: { points: 2 },
      };
    } else {
      updateQuery = { $addToSet: { upVotes: userId }, $inc: { points: 1 } };
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
export async function handleDownvote(params: {
  postId: string;
  userId: string;
  path: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
}) {
  try {
    connectToDatabase();
    const { postId, userId, hasUpvoted, hasDownvoted, path } = params;
    let updateQuery = {};
    if (hasDownvoted) {
      updateQuery = { $pull: { downVotes: userId }, $inc: { points: 1 } };
    } else if (hasUpvoted) {
      updateQuery = {
        $pull: {
          upVotes: userId,
        },
        $push: { downVotes: userId },
        $inc: { points: -2 },
      };
    } else {
      updateQuery = { $addToSet: { downVotes: userId }, $inc: { points: -1 } };
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
export async function getPostsByTopicId(params: any) {
  try {
    connectToDatabase();
    const { topicId, page = 1, pageSize = 20 } = params;
    const posts = await Post.find({ topic: topicId })
      .populate({
        path: "topic",
        model: Topic,
      })
      .populate({
        path: "author",
        model: User,
        select: "username name",
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return posts;
  } catch (error) {
    console.log(error);
  }
}
export async function countPostByUserId(params: { userId: string }) {
  try {
    connectToDatabase();
    const { userId } = params;
    const count = await Post.countDocuments({ author: userId });
    return count;
  } catch (error) {
    console.log(error);
  }
}
