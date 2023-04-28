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
  query Fruit($id: ID!) {
    fruit(id: $id) {
      id
      name
      price
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
