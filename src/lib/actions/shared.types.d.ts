import { ITopic } from "@/database/topic.model";
import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface GetPostParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
  sorted?: "latest" | "popular";
  topic?: string;
  userId?: string;
}
export interface CreatePostParams {
  title: string;
  content: string;
  author: Schema.Types.ObjectId | IUser;
  topic: Schema.Types.ObjectId | ITopic;
  path?: string;
  desc?: string;
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
  isFollowing?: boolean;
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
export interface CreateTopicParams {
  _id?: string;
  name: string;
  value: string;
  icon: string;
  desc: string;
}
export interface FollowUserParams {
  userId: string;
  followerId?: string;
  hasFollowing: boolean;
  path?: string;
}
export interface GetTopicParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}
export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
