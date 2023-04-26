import { Schema, model } from "mongoose";

const storeSchema = new Schema({
  name: String,
  price: String,
});

export default model("store", storeSchema);
