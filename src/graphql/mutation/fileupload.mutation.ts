import { gql } from "@apollo/client";

export const GET_FILE_URL = gql`
  mutation getFileUploadUrl($content_type: String!, $folder: String!) {
    getFileUploadUrl(content_type: $content_type, folder: $folder) {
      fileUploadUrl
      fileName
      content_type
    }
  }
`;
