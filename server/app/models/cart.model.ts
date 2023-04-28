import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  id: String,
  amount: Number,
});

export default model("cart", cartSchema);
