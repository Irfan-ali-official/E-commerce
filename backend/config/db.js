import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.MONGO_URI);
export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB connected :${conn.connection.host}`);
  try {
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // 1 code means exit with a failure , 0 means success
  }
};

export default connectDB;
