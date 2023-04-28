import request from 'graphql-request';
import {
  GET_ALL_FRUITS,
  GET_ALL_CART_FRUITS,
  GET_FRUIT,
  ADD_FRUIT,
} from './queries';

const API_URL = 'http://10.0.2.2:4001/graphql';

export const getFruits = async () => {
  return await request(API_URL, GET_ALL_FRUITS)
    .then((data): any => {
      return data.getFruits;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getFruitById = async (id: string) => {
  return await request(API_URL, GET_FRUIT, {id})
    .then((data): any => {
      return data.fruit;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getCart = async () => {
  return await request(API_URL, GET_ALL_CART_FRUITS)
    .then((data): any => {
      return data.getCart;
    })
    .catch(err => {
      console.log(err);
    });
};

export const addFruit = async ({id, amount}: any) => {
  return await request(API_URL, ADD_FRUIT, {cartInput: {id, amount}})
    .then((data): any => {
      console.log('DATA', data);
      return data.addFruit;
    })
    .catch(err => {
      console.log(err);
    });
};
