import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      phone
      email
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: String!) {
    users_by_pk(id: $id) {
      id
      name
      phone
      email
      gender
    }
  }
`;