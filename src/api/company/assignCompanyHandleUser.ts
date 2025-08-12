import { APIAxiosInstance } from "@/lib";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// API call
// API call
const handleAssignUserCompanyForm = async ({ id, values }: { id: string; values: IAssignUserToCompany }) => {
  try {
    const response = await APIAxiosInstance.post(`/company/post/assign-user?user_id=${id}`, values);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Terjadi kesalahan saat assign user ke company";
  }
};

// Custom hook
export const useAssignUserToCompany = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: IAssignUserToCompany) => handleAssignUserCompanyForm({ id, values }),
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
