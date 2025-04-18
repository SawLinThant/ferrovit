import { gql } from "@apollo/client";

export const CREATE_BLOG = gql`
  mutation CreateBlog($input: blogs_insert_input!) {
    insert_blogs_one(object: $input) {
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

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($id: uuid!, $input: blogs_set_input!) {
    update_blogs_by_pk(pk_columns: { id: $id }, _set: $input) {
      id
      title
      subtitle
      author
      description
      highlight_text
      created_at
    }
  }
`;