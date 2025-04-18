import { gql } from "@apollo/client";

export const CREATE_USER_RESPONSE = gql`
  mutation CreateUserResponse($input: user_responses_insert_input!) {
    insert_user_responses_one(object: $input) {
      id
      quiz_user_id
      question_id
      choice_id
      submitted_at
    }
  }
`;

export const DELETE_USER_RESPONSE = gql`
  mutation DeleteUserResponse($id: uuid!) {
    delete_user_responses_by_pk(id: $id) {
      id
    }
  }
`;