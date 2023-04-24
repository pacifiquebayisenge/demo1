import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  Id: String,
  amount: Number,
});

export default model("cart", cartSchema);
