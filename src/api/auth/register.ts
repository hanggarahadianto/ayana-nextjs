import { useMutation, useQueryClient } from "@tanstack/react-query"; // Correct import from '@tanstack/react-query'
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";

const handleSubmitUserForm = async (values: IUserCreate) => {
  const response = await APIAxiosInstance.post(`auth/register`, values);
  return response.data;
};

// Custom hook for the mutation
export const useSubmitUserForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: IUserCreate) => handleSubmitUserForm(values),
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
      console.log("data", data);
      showNotification({
        title: "Data Gagal Disimpan",
        message: `${data.response.data.message}`,
        color: "red",
      });
    },
    onSettled: () => {},
  });
};
