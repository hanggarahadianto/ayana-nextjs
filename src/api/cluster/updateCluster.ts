import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type IClusterUpdateWithoutId = Omit<IClusterUpdate, "id">;

const handleUpdateClusterForm = async (values: IClusterUpdateWithoutId, id: string) => {
  try {
    const response = await APIAxiosInstance.put(`cluster/update/${id}`, values);
    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      throw new Error((error as any).response?.data?.message || "Terjadi kesalahan saat memperbarui data cluster");
    }
    throw new Error("Terjadi kesalahan saat memperbarui data cluster");
  }
};

export const useUpdateClusterData = (closeModal: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, IClusterUpdate & { id: string }>({
    mutationFn: (values) => {
      const { id, ...rest } = values;
      return handleUpdateClusterForm(rest, id);
    },

    onSuccess: async (data) => {
      if (data) {
        await queryClient.refetchQueries({
          queryKey: ["getAllClusters"],
          exact: false,
        });
      }
      showNotification({
        title: "Data Berhasil Dikirim",
        message: "Produk berhasil diperbarui",
        color: "green",
      });
      closeModal();
    },

    onError: (error: Error) => {
      showNotification({
        title: "Data Gagal Disimpan",
        message: error.message || "Terjadi kesalahan",
        color: "red",
      });
    },
  });
};
