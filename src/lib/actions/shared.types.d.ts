import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface GetPostParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}
export interface CreatePostParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path?: string;
  cover?: string;
}
export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  joinedAt?: Date;
  bio?: string;
}
export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}
export interface DeleteUserParams {
  clerkId: string;
}
export interface GetAllUserParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}
export interface GetAllTagParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}
export interface GetPostByIdParams {
  postId: string;
}
export interface GetPostByUserIdParams {
  userId: string;
}
export interface CreateCommentParams {
  content: string;
  author: string;
  post: string;
  path: string;
}
export interface PostVoteParams {
  postId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
}
export interface CommentVoteParams {
  commentId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
}
