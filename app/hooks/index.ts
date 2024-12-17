import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "../services";

export const useUploadFile = () => {
  return useMutation({
        mutationKey: ["upload"],
    mutationFn: ({ filename, file }: { filename: string; file: File }) =>
      uploadFile({ filename, file }),
  });
};
