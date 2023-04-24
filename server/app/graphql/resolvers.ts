import Fruit from "../models/store.model";
import Cart from "../models/cart.model";

const Resolvers = {
  Query: {
    async fruit(_: any, { ID }: any) {
      return await Fruit.findById(ID);
    },

    async getFruits() {
      return await Fruit.find();
    },

    async getCart() {
      return await Cart.find();
    },
  },
  Mutation: {
    async createFruit(_: any, { fruitInput: { name, price } }: any) {
      const createdFruit = new Fruit({
        name,
        price,
      });

      const res = await createdFruit.save();
      // MongoDB saving
      console.log(res);

      return res;
    },

    async deleteFruit(_: any, { ID }: any) {
      // 1 if something was deleted, 0 if not
      const wasDeleted = (await Fruit.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },

    async editFruit(_: any, { ID, fruitInput: { name, price } }: any) {
      // 1 if something was edited, 0 if not
      const wasEdited = (await Fruit.updateOne({ _id: ID }, { name, price }))
        .modifiedCount;
      return wasEdited;
    },

    async addFruit(_: any, { cartInput: { ID, amount } }: any) {
      const newCartItem = new Cart({
        ID,
        amount,
      });

      const res = await newCartItem.save();

      return res;
    },

    async removeFruit(_: any, { cartInput: { ID } }: any) {
      // 1 if something was deleted, 0 if not
      const wasDeleted = (await Cart.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },

    async updateFruit(_: any, { ID, cartInput: { amount } }: any) {
      // 1 if something was edited, 0 if not
      const wasEdited = (await Cart.updateOne({ _id: ID }, { amount }))
        .modifiedCount;
      return wasEdited;
    },
  },
};

export default Resolvers;
