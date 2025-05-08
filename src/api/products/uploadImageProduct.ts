import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useUploadImageProduct = (refetch: () => void, onClose: () => void) => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post("/api/products/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      refetch();
      onClose();
    },
    onError: (error: any) => {
      console.error("Upload gambar gagal:", error);
      throw error;
    },
  });
};
