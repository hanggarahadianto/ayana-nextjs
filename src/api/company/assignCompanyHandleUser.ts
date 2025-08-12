import { APIAxiosInstance } from "@/lib";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// API call
const handleAssignUserCompanyForm = async (values: IAssignUserToCompany) => {
  try {
    const userId = values.user_ids?.[0]; // ambil user pertama, atau sesuaikan
    const response = await APIAxiosInstance.post(`/company/post/assign-user?user_id=${userId}`, values);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Terjadi kesalahan saat assign user ke company";
  }
};

// Custom hook
export const useAssignUserToCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleAssignUserCompanyForm,
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["getCompanyByIdData"],
        exact: false,
      });
      showNotification({
        title: "Berhasil",
        message: "User berhasil diassign ke perusahaan",
        color: "green",
      });
    },
    onError: (err: any) => {
      showNotification({
        title: "Gagal",
        message: `${err}`,
        color: "red",
      });
    },
  });
};
