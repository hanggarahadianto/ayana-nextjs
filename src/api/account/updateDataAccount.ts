import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";

const handleEditAccountForm = async (id: string, values: IAccountUpdate) => {
  try {
    const response = await APIAxiosInstance.put(`/account/edit/${id}`, values);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Terjadi kesalahan saat mengedit akun";
  }
};

export const useUpdateAccountForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: IAccountUpdate }) => handleEditAccountForm(id, values),
    onSuccess: async (data: any) => {
      // console.log("✅ Update berhasil:", data);

      await queryClient.refetchQueries({
        queryKey: ["getAccountData"],
        exact: false,
      });

      showNotification({
        title: "Berhasil",
        message: "Data akun berhasil diperbarui.",
        color: "green",
      });
    },
    onError: (error: any) => {
      // console.log("❌ Update gagal:", error);

      showNotification({
        title: "Data Gagal Disimpan",
        message: `${error}`,
        color: "red",
      });
    },
  });
};
