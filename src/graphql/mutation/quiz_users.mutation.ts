import { gql } from "@apollo/client";

export const CREATE_QUIZ_USER = gql`
  mutation CreateQuizUser($input: quiz_users_insert_input!) {
    insert_quiz_users_one(object: $input) {
      id
      phone
      address
      created_at
    }
  }
`;