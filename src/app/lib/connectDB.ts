import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGODB_URL || "";

if (!DATABASE_URL) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}
const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
