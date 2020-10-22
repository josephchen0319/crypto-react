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

export const GET_FILTER_GROUPS = gql`
  query GetFilterGroups {
    me {
      savedFilterGroups {
        edges {
          node {
            id
            groupName
            state
            filterDetails {
              edges {
                node {
                  id
                  firstArgument
                  secondArgument
                  filter {
                    id
                    filterName
                    filterContent
                    filterToApiField
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
