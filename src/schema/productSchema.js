import { Schema } from "mongoose";

let productSchema = Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  productImage: {
    type: String,
  },
});

export default productSchema;
