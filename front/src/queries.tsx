/* eslint-disable prettier/prettier */
import {request, gql} from 'graphql-request';

export const GET_ALL_FRUITS = gql`
  query GetFruits {
    getFruits {
      name
      price
      id
    }
  }
`;
