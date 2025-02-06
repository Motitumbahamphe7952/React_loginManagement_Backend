import { Schema } from "mongoose";

let reviewSchema = Schema({
  user: {
    type: String,
    required: [true, "user field is required."],
  },
  product: {
    type: String,
    required: [true, "review field is required."],
  },
  description: {
    type: String,
    required: [true, "description field is required"],
  },
});

export default reviewSchema;
