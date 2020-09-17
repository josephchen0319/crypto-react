import { gql } from "@apollo/client";

export const GET_FOLLOWING_COINS = gql`
  query GetFollowingCoins {
    me {
      followingCoins {
        edges {
          node {
            id
            cryptoId
            cryptoSymbol
            state
          }
        }
      }
    }
  }
`;
