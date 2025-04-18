import { GET_FILE_URL } from "@/graphql/mutation/fileupload.mutation";
import { useMutation } from "@apollo/client";
import React from "react";

interface UseUploadToS3Return {
  uploadToS3: (image: File) => Promise<string | undefined>;
  loading: boolean;
  error: Error | undefined;
}

export const useUploadToS3 = (): UseUploadToS3Return => {
  const [getFileUrl] = useMutation(GET_FILE_URL);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>(undefined);

  const uploadToS3 = async (image: File): Promise<string | undefined> => {
    if (!image) {
      setError(new Error("Please select a file to upload"));
      return;
    }

    setLoading(true);
    setError(undefined);

    try {
      const folder = "products";
      let contentType = image.type;
      if (contentType.startsWith("image")) {
        contentType = "image";
      } else if (contentType.startsWith("application/pdf")) {
        contentType = "pdf";
      } else if (contentType.startsWith("video")) {
        contentType = "video";
      } else {
        throw new Error("Unsupported file type");
      }

      const { data } = await getFileUrl({
        variables: {
          content_type: contentType,
          folder: folder,
        },
      });

      const { fileUploadUrl } = data.getFileUploadUrl;
      const response = await fetch(fileUploadUrl, {
        method: "PUT",
        body: image,
        headers: {
          "Content-Type": image.type,
          "x-amz-acl": "public-read",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }

      console.log("Image uploaded successfully");
      const publicUrl = fileUploadUrl.split("?")[0];
      return publicUrl;
    } catch (err) {
    //   console.error("Error uploading file", err);
    //   throw new Error("error uploading");
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { uploadToS3, loading, error };
};
