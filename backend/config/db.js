import mongoose from "mongoose";

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("db Connected");
  } catch (error) {
    console.log(error);
  }
}

export default connectDb;
