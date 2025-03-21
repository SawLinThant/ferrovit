import { gql } from "@apollo/client";

export const GET_ALL_QUESTIONS = gql`
  query GetAllQuestions {
    questions {
      id
      question_text
      category
      question_no
    }
  }
`;

export const GET_QUESTION_BY_ID = gql`
  query GetQuestionById($id: uuid!) {
    questions_by_pk(id: $id) {
      id
      question_text
      category
      question_no
      choices {
        id
        choice_text
        question_id
      }
    }
  }
`;

export const GET_QUESTION_BY_QUESTION_NO = gql`
  query GetQuestionByQuestionNo($question_no: String!) {
    questions(where: { question_no: { _eq: $question_no } }) {
      id
      question_text
      category
      question_no
      choices {
        id
        choice_text
        question_id
      }
    }
  }
`;
