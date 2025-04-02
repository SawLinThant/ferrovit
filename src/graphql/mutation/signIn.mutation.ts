import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      token
      message
    }
  }
`;