import request from 'graphql-request';
import {
  GET_ALL_FRUITS,
  GET_ALL_CART_FRUITS,
  GET_FRUIT,
  ADD_FRUIT,
  UPDATE_FRUIT,
  GET_CART_FRUIT,
  REMOVE_FRUIT,
  GET_ALL_FRUITS_BY,
} from './queries';

const API_URL = 'http://10.0.2.2:4000/graphql';

export const getFruits = async (name: string, price: string) => {
  return await request(API_URL, GET_ALL_FRUITS, {fruitInput: {name, price}})
    .then((data): any => {
      return data.getFruits;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getFruitsBy = async (name: string, price: string) => {
  return await request(API_URL, GET_ALL_FRUITS_BY, {fruitInput: {name, price}})
    .then((data): any => {
      return data.getFruits;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getFruitById = async (fruitId: string) => {
  return await request(API_URL, GET_FRUIT, {fruitId})
    .then((data): any => {
      return data.fruit;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getCartFruitById = async (fruitId: string) => {
  return await request(API_URL, GET_CART_FRUIT, {fruitId})
    .then((data): any => {
      return data.cartFruit;
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

export const addFruit = async ({fruitId, amount}: any) => {
  return await request(API_URL, ADD_FRUIT, {cartInput: {id: fruitId, amount}})
    .then((data): any => {
      console.log('DATA', data);
      return data.addFruit;
    })
    .catch(err => {
      console.log(err);
    });
};

export const updateFruit = async ({fruitId, amount}: any) => {
  return await request(API_URL, UPDATE_FRUIT, {
    updateFruitId: fruitId,
    cartUpdateInput: {amount},
  })
    .then((data): any => {
      console.log('fruit updated ? ', data.updateFruit);

      return data.updateFruit;
    })
    .catch(err => {
      console.log('rr', err);
    });
};

export const removeFromCart = async (id: string) => {
  return await request(API_URL, REMOVE_FRUIT, {cartInput: {id}})
    .then((data): any => {
      console.log('fruit deleted  ? ', data.removeFruit);

      return data.removeFruit;
    })
    .catch(err => {
      console.log(err);
    });
};
