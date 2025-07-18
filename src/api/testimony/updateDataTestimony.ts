import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ICustomerTestimonyUpdateWithoutId = Omit<ITestimonyUpdate, "id">;

const handleUpdateCustomerTestimonyForm = async (values: ICustomerTestimonyUpdateWithoutId, id: string) => {
  try {
    const response = await APIAxiosInstance.put(`customer/testimony/update/${id}`, values);
    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      throw new Error((error as any).response?.data?.message || "Terjadi kesalahan saat memperbarui data customer");
    }
    throw new Error("Terjadi kesalahan saat memperbarui data customer");
  }
};

export const useUpdateCustomerTestimonyData = (closeModal: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, ITestimonyUpdate & { id: string }>({
    mutationFn: (values) => {
      const { id, ...rest } = values;
      return handleUpdateCustomerTestimonyForm(rest, id);
    },

    onSuccess: async (data) => {
      if (data) {
        await queryClient.refetchQueries({
          queryKey: ["getTestimonyData"],
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
