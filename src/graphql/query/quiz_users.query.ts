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
       results {
        id
        quiz_user_id
        total_points
        health_status
      }
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
      results {
        id
        quiz_user_id
        total_points
        health_status
      }
    }
  }
`;

export const GET_FILTERED_QUIZ_USERS = gql`
  query GetQuizUsersWithResponses(
    $where: quiz_users_bool_exp!
    $offset: Int
    $limit: Int
  ) {
    quiz_users(where: $where, offset: $offset, limit: $limit) {
      id
      phone
      address
      created_at
       results {
        id
        quiz_user_id
        total_points
        health_status
      }
    }
    quiz_users_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
