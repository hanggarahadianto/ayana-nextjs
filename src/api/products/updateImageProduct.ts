import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstanceMultipart } from "../../lib";

interface UpdateImageParams {
  productId: string;
  formData: FormData;
}

const updateImagesRequest = async ({ productId, formData }: UpdateImageParams) => {
  console.log("Sending formData with keys:");
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
  const response = await APIAxiosInstanceMultipart.put(`/home/update/images/${productId}`, formData);
  return response.data;
};

export const useUpdateImageProduct = (onClose: () => void, clusterId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateImagesRequest,
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["getProductDataByClusterId", clusterId],
      });

      showNotification({
        title: "Update selesai",
        message: "Gambar berhasil diperbarui",
        color: "green",
      });

      onClose();
    },
    onError: (error: any) => {
      showNotification({
        title: "Update gagal",
        message: error.message || "Terjadi kesalahan saat memperbarui gambar",
        color: "red",
      });
    },
  });
};
