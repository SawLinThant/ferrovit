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