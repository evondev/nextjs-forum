"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

export async function getUserById({ userId }: { userId: string }) {
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
  }
}
