import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

async function connectDB() {
  try {
    // mongoose.set("strictQuery", true);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log("db Connected : ", connectionInstance.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;
