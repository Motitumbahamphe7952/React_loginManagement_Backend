import mongoose from "mongoose";
import { dburl } from "../validation/constant.js"
const connectToMongoDb = () => {
  mongoose.connect(`${dburl}`);
  console.log(`application is connected to database successfully at port ${dburl}`);
};

export default connectToMongoDb;
