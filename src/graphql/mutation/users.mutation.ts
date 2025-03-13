import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: users_insert_input!) {
    insert_users_one(object: $input) {
      id
      name
      phone
      email
      gender
    }
  }
`;