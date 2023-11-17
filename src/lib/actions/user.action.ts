"use server";

import Post from "@/database/post.model";
import User from "@/database/user.model";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";

export async function getUserById({ userId }: { userId: string }) {
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
  }
}
export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.log(error);
  }
}
export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();
    const user = await User.findOneAndDelete({ clerkId: params.clerkId });
    if (!user) {
      throw new Error("User not found");
    }
    // Delete user from database and posts, comments, etc.
    const userPostIds = await Post.find({ author: user._id }).distinct("_id");
    // Delete all posts by user
    await Post.deleteMany({ author: user._id });
    // Todo: delete users comments
    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error);
  }
}
export async function getUsers() {
  try {
    connectToDatabase();
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
  }
}
export async function followUser(followerId: string) {
  console.log("file: user.action.ts:72 ~ followUser ~ followerId:", followerId);
  try {
    connectToDatabase();
    const { userId } = auth();
    const loggedInUser = await User.findOne({ clerkId: userId });
    const loggedInId = loggedInUser._id.toString();

    await User.findByIdAndUpdate(followerId, {
      $addToSet: { followers: loggedInId },
    });
    await User.findByIdAndUpdate(loggedInId, {
      $addToSet: { following: followerId },
    });
    revalidatePath(`/users`);
  } catch (error) {}
}
