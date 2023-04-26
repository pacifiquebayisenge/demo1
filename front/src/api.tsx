import request from 'graphql-request';
import {GET_ALL_FRUITS} from './queries';

export const API_URL = 'http://10.0.2.2:4001/graphql';

export async function getFruits() {
  return await request(API_URL, GET_ALL_FRUITS)
    .then((data): any => {
      return data.getFruits;
    })
    .catch(err => {
      console.log('////', err);
    });
}
