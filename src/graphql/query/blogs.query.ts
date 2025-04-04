import { gql } from "@apollo/client";

export const GET_ALL_BLOGS = gql`
  query GetAllBlogs {
    blogs(order_by: { created_at: desc }) {
      id
      title
      subtitle
      author
      created_at
      description
      highlight_text
    }
  }
`;

export const GET_BLOG_BY_ID = gql`
  query GetBlogById($id: uuid!) {
    blogs_by_pk(id: $id) {
      id
      title
      subtitle
      author
      created_at
      description
      highlight_text
    }
  }
`;

export const GET_FILTERED_BLOGS = gql`
  query GetAllBlogs($where: blogs_bool_exp!, $offset: Int, $limit: Int) {
    blogs(where: $where, offset: $offset, limit: $limit) {
      id
      title
      subtitle
      author
      created_at
      description
      highlight_text
    }
    blogs_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
