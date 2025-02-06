import { Schema } from "mongoose";

let userSchema = Schema({
  name: {
    type: String,
    required: [true, "name field is required."],
  },
  email: {
    type: String,
    required: [true, "email field is required."],
  },
  password: {
    type: String,
    required: [true, "password field is required"],
  },
});

export default userSchema;
