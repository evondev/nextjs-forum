import { connectToDatabase } from "../mongoose";

export async function createPost() {
  try {
    connectToDatabase();
  } catch (error) {}
}
