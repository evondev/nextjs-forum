import mongoose from "mongoose";
let isConnected: boolean = false;
export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URI is not defined");
  }
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "Hipnode",
    });
    isConnected = true;
    console.log("=> using new database connection");
  } catch (error) {
    console.log("=> error while connecting with database:");
  }
};
