import { gql } from "@apollo/client";

export const GET_ALL_QUIZ_USERS = gql`
  query GetAllQuizUsers {
    quiz_users {
      id
      first_name
      last_name
      phone
      address
      created_at
    }
  }
`;

export const GET_QUIZ_USER_BY_ID = gql`
  query GetQuizUserById($id: uuid!) {
    quiz_users_by_pk(id: $id) {
      id
      first_name
      last_name
      phone
      address
      created_at
    }
  }
`;