"use server";
import { connectToDatabase } from "../mongoose";

export async function createPost(params: any) {
  try {
    connectToDatabase();
  } catch (error) {}
}
