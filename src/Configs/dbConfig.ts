//database configuration
import mongoose from "mongoose";

//connects to mongodb database using the provided string in env
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "CitySoundscape",
    });

    console.log(`✅ MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); 
  }
};

export default connectDB