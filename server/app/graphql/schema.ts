import { gql } from "apollo-server-core";

const Schema = gql`
  type Fruit {
    id: String
    name: String
    price: String
  }

  type Cart {
    id: String
    amount: Int
  }

  input FruitInput {
    name: String
    price: String
  }

  input CartInput {
    id: String
    amount: Int
  }

  input CartUpdateInput {
    amount: Int
  }

  type Query {
    fruit(id: ID!): Fruit!
    getFruits: [Fruit]
    getCart: [Cart]
  }

  type Mutation {
    createFruit(fruitInput: FruitInput): Fruit!
    deleteFruit(id: ID!): Boolean
    editFruit(id: ID!, fruitInput: FruitInput): Boolean

    addFruit(cartInput: CartInput): Cart
    removeFruit(cartInput: CartInput): Boolean
    updateFruit(id: ID!, cartUpdateInput: CartUpdateInput): Boolean
  }
`;

export default Schema;
