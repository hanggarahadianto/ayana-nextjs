import { APIAxiosInstance } from "@/lib";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const handleUpdateCompanyForm = async (values: ICompanyUpdate) => {
  try {
    const response = await APIAxiosInstance.put(`company/update/${values.id}`, values);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Terjadi kesalahan saat mengedit akun";
  }
};

// Custom hook for the mutation
export const useUpdateCompanyForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: ICompanyUpdate) => handleUpdateCompanyForm(values),
    onSuccess: async (data: any) => {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ["getCompanyByIdData"],
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
