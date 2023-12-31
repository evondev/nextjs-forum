"use server";
import Comment from "@/database/comment.model";
import Post from "@/database/post.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { CommentVoteParams, CreateCommentParams } from "./shared.types";

export async function createComment(params: CreateCommentParams) {
  try {
    connectToDatabase();
    const { content, author, post, path } = params;
    const newComment = await Comment.create({
      content,
      author,
      post,
    });
    await Post.findByIdAndUpdate(post, {
      $push: {
        comments: newComment._id,
      },
    });
    revalidatePath(path);
  } catch (error: any) {
    console.log(error);
  }
}
export async function getComments(params: any) {
  try {
    connectToDatabase();
    const comments = await Comment.find({ post: params.postId })
      .populate({
        path: "author",
        model: User,
        select: "username avatar clerkId",
      })
      .sort({ createdAt: -1 });
    return comments;
  } catch (error: any) {
    console.log(error);
  }
}
export async function upvoteComment(params: CommentVoteParams) {
  try {
    connectToDatabase();
    const { commentId, userId, hasUpvoted, hasDownvoted, path } = params;
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
    const comment = await Comment.findByIdAndUpdate(commentId, updateQuery, {
      new: true,
    });
    if (!comment) throw new Error("Comment not found");
    revalidatePath(path);
  } catch (error: any) {
    console.log(error);
  }
}
export async function downvoteComment(params: CommentVoteParams) {
  try {
    connectToDatabase();
    const { commentId, userId, hasUpvoted, hasDownvoted, path } = params;
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
    const comment = await Comment.findByIdAndUpdate(commentId, updateQuery, {
      new: true,
    });
    if (!comment) throw new Error("Comment not found");
    revalidatePath(path);
  } catch (error: any) {
    console.log(error);
  }
}
