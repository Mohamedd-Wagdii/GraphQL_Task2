import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

async function initDB() {
  if (!MONGODB_URI) {
    console.error("❌ Missing MongoDB connection string");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Successfully connected to MongoDB");
  } catch (error) {
    console.error("⚠️ Failed to connect MongoDB:", error.message);
    process.exit(1);
  }
}

export default initDB;
