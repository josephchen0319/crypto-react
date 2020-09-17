import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup(
    $firstName: String
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    createMember(
      input: {
        firstName: $firstName
        lastName: $lastName
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      state
      user {
        username
        firstName
        lastName
        email
      }
    }
  }
`;

export const FOLLOW_COIN = gql`
  mutation FollowCoin($cryptoId: String!, $cryptoSymbol: String!) {
    followCoin(input: { cryptoId: $cryptoId, cryptoSymbol: $cryptoSymbol }) {
      following {
        id
        cryptoId
        cryptoSymbol
      }
    }
  }
`;

export const UNFOLLOW_COIN = gql`
  mutation FollowCoin($id: String!) {
    unfollowCoin(input: { id: $id }) {
      ok
    }
  }
`;
