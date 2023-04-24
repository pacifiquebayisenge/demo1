import { gql } from "apollo-server-core";

const Schema = gql`
  type Fruit {
    name: String
    price: Int
  }

  type Cart {
    id: String
    amount: Int
  }

  input FruitInput {
    name: String
    price: Int
  }

  input CartInput {
    ID: String
    amount: Int
  }

  type Query {
    fruit(ID: ID!): Fruit!
    getFruits: [Fruit]
    getCart: [Cart]
  }

  type Mutation {
    createFruit(fruitInput: FruitInput): Fruit!
    deleteFruit(ID: ID!): Boolean
    editFruit(ID: ID!, fruitInput: FruitInput): Boolean

    addFruit(cartInput: CartInput): Cart
    removeFruit(cartInput: CartInput): Boolean
    updateFruit(ID: ID!, cartInput: CartInput): Boolean
  }
`;

export default Schema;
