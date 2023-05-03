/* eslint-disable prettier/prettier */

import {gql} from 'graphql-request';

export const GET_ALL_FRUITS = gql`
  query GetFruits {
    getFruits {
      name
      price
      id
    }
  }
`;

export const GET_FRUIT = gql`
  query Query($fruitId: ID!) {
    fruit(id: $fruitId) {
      id
      name
      price
    }
  }
`;

export const GET_CART_FRUIT = gql`
  query CartFruit($cartFruitId: ID!) {
    cartFruit(id: $cartFruitId) {
      amount
      id
    }
  }
`;

export const GET_ALL_CART_FRUITS = gql`
  query Query {
    getCart {
      id
      amount
    }
  }
`;

export const ADD_FRUIT = gql`
  mutation AddFruit($cartInput: CartInput) {
    addFruit(cartInput: $cartInput) {
      id
      amount
    }
  }
`;

export const UPDATE_FRUIT = gql`
  mutation Mutation($updateFruitId: ID!, $cartUpdateInput: CartUpdateInput) {
    updateFruit(id: $updateFruitId, cartUpdateInput: $cartUpdateInput)
  }
`;

export const REMOVE_FRUIT = gql`
  mutation RemoveFruit($cartInput: CartInput) {
    removeFruit(cartInput: $cartInput)
  }
`;
