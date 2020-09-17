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
