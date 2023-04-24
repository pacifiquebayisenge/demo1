import { Schema, model } from "mongoose";

const storeSchema = new Schema({
  name: String,
  price: Number,
});

export default model("store", storeSchema);
