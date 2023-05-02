import Fruit from "../models/store.model";
import Cart from "../models/cart.model";

const Resolvers = {
  Query: {
    async fruit(_: any, { id }: any) {
      return await Fruit.findById(id);
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

    async deleteFruit(_: any, { id }: any) {
      // 1 if something was deleted, 0 if not
      const wasDeleted = (await Fruit.deleteOne({ _id: id })).deletedCount;
      return wasDeleted;
    },

    async editFruit(_: any, { id, fruitInput: { name, price } }: any) {
      // 1 if something was edited, 0 if not
      const wasEdited = (await Fruit.updateOne({ _id: id }, { name, price }))
        .modifiedCount;
      return wasEdited;
    },

    async addFruit(_: any, { cartInput: { id, amount } }: any) {
      const newCartItem = new Cart({
        id,
        amount,
      });

      const myCart = await Cart.find();

      if (myCart.find((e: any) => e.id === id)) {
        // update existing fruit

        return await this.updateFruit(null, {
          id,
          cartUpdateInput: { amount },
        });
      }

      return await newCartItem.save();
    },

    async removeFruit(_: any, { cartInput: { id } }: any) {
      // 1 if something was deleted, 0 if not
      const wasDeleted = (await Cart.deleteOne({ _id: id })).deletedCount;
      return wasDeleted;
    },

    async updateFruit(_: any, { id, cartUpdateInput: { amount } }: any) {
      // 1 if something was edited, 0 if not
      const wasEdited = (await Cart.updateOne({ id: id }, { amount }))
        .modifiedCount;
      return wasEdited;
    },
  },
};

export default Resolvers;
