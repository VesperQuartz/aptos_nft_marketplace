import { PutBlobResult } from "@vercel/blob";
import to from "await-to-ts";

export const uploadFile = async ({
  filename,
  file,
}: {
  filename: string;
  file: File;
}) => {
  const [error, response] = await to(
    fetch(`/api/upload?filename=${filename}`, {
      method: "POST",
      body: file,
    }),
  );
  if (error) {
    throw error;
  }
  if (!response.ok) {
    throw new Error("Failed to upload file");
  }
  const data = await response.json();
  return data as PutBlobResult;
};
