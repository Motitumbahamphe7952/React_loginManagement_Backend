// import mongoose from "mongoose";
// import { dburl } from "../validation/constant.js"
// const connectToMongoDb = () => {
//   mongoose.connect(`${dburl}`);
//   console.log(`application is connected to database successfully at port ${dburl}`);
// };

// export default connectToMongoDb;

import mongoose from "mongoose";
import { dburl } from "../validation/constant.js";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(dburl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected Successfully at ${dburl}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectToMongoDb;

