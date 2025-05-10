import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstanceMultipart } from "../../lib";

interface UploadImageParams {
  productId: string;
  formData: FormData;
}

const uploadImagesRequest = async ({ productId, formData }: UploadImageParams) => {
  const response = await APIAxiosInstanceMultipart.post(`/home/${productId}/images`, formData);
  return response.data;
};

export const useUploadImages = (onClose: () => void, clusterId: string) => {
  const queryClient = useQueryClient(); // ✅ gunakan ini

  return useMutation({
    mutationFn: uploadImagesRequest,
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["getProductDataByClusterId", clusterId],
      });

      showNotification({
        title: "Upload selesai",
        message: "Gambar berhasil diunggah",
        color: "green",
      });

      onClose();
    },
    onError: (error: any) => {
      showNotification({
        title: "Upload gagal",
        message: error.message || "Terjadi kesalahan saat mengunggah gambar",
        color: "red",
      });
    },
  });
};
