import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ICustomerUpdateWithoutId = Omit<ICustomerUpdate, "id">;

const handleUpdateCustomerForm = async (values: ICustomerUpdateWithoutId, id: string) => {
  try {
    const response = await APIAxiosInstance.put(`customer/update/${id}`, values);
    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      throw new Error((error as any).response?.data?.message || "Terjadi kesalahan saat memperbarui data customer");
    }
    throw new Error("Terjadi kesalahan saat memperbarui data customer");
  }
};

export const useUpdateCustomerData = (closeModal: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, ICustomerUpdate & { id: string }>({
    mutationFn: (values) => {
      const { id, ...rest } = values;
      return handleUpdateCustomerForm(rest, id);
    },

    onSuccess: async (data) => {
      if (data) {
        await queryClient.refetchQueries({
          queryKey: ["getCustomerData"],
          exact: false,
        });
      }
      showNotification({
        title: "Data Berhasil Dikirim",
        message: "Data berhasil diperbarui",
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
