import { gql } from "@apollo/client";

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($input: questions_insert_input!) {
    insert_questions_one(object: $input) {
      id
      question_text
      category
      question_no
    }
  }
`;