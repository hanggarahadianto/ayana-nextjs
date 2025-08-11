import { useMutation, useQueryClient } from "@tanstack/react-query"; // Correct import from '@tanstack/react-query'
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";

const handleUpdateUserForm = async (values: IUserUpdate) => {
  try {
    const response = await APIAxiosInstance.put(`user/update/${values.id}`, values);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Terjadi kesalahan saat mengedit akun";
  }
};

// Custom hook for the mutation
export const useUpdateUserForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: IUserUpdate) => handleUpdateUserForm(values),
    onSuccess: async (data: any) => {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ["getUserByIdData"],
          exact: false,
        }),
      ]);
      showNotification({
        title: "Berhasil",
        message: "Data berhasil disimpan",
        color: "green",
      });
    },
    onError: (data: any) => {
      showNotification({
        title: "Data Gagal Disimpan",
        message: `${data.message}`,
        color: "red",
      });
    },
    onSettled: () => {},
  });
};
