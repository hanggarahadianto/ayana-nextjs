import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "@/lib"; // pastikan ini sudah disetup

const handleSubmitTestimonyForm = async (values: ITestimonyCreate) => {
  const response = await APIAxiosInstance.post(`customer/testimony/post`, values);
  return response.data;
};

export const useSubmitTestimonyForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: ITestimonyCreate) => handleSubmitTestimonyForm(values),
    onSuccess: async () => {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ["getTestimonyData"],
          exact: false,
        }),
      ]);
      showNotification({
        title: "Berhasil",
        message: "Testimony berhasil disimpan",
        color: "green",
      });
    },
    onError: (error: any) => {
      showNotification({
        title: "Gagal menyimpan testimony",
        message: error.message || "Terjadi kesalahan saat menyimpan",
        color: "red",
      });
    },
    onSettled: () => {},
  });
};
