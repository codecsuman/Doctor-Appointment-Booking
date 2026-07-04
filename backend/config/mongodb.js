import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB Connected");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB Error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB Disconnected");
    });

    await mongoose.connect(process.env.MONGODB_URI);

  } catch (error) {
    console.error("❌ Failed to connect to MongoDB");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;