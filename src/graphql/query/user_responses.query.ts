import { gql } from "@apollo/client";

export const GET_ALL_USER_RESPONSES = gql`
  query GetAllUserResponses {
    user_responses {
      id
      quiz_user_id
      question_id
      choice_id
      submitted_at
    }
  }
`;

export const GET_USER_RESPONSE_BY_ID = gql`
  query GetUserResponseById($id: uuid!) {
    user_responses_by_pk(id: $id) {
      id
      quiz_user_id
      question_id
      choice_id
      submitted_at
    }
  }
`;

export const GET_USER_RESPONSE_BY_QUIZ_USER_ID_AND_QUESTION_ID = gql`
  query GetUserResponseByQuizUserIdAndQuestionId($quiz_user_id: uuid!, $question_id: uuid!) {
    user_responses(where: { quiz_user_id: { _eq: $quiz_user_id }, question_id: { _eq: $question_id } }) {
      id
      quiz_user_id
      question_id
      choice_id
    }
  }
`;