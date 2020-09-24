import { gql } from "@apollo/client";

export const GET_FILTERS = gql`
  query {
    filters {
      edges {
        node {
          id
          category
          filterName
          filterContent
          createdTime
          updatedTime
        }
      }
    }
  }
`;
