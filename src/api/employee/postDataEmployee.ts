import { useMutation, useQueryClient } from "@tanstack/react-query"; // Correct import from '@tanstack/react-query'
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";

const handleSubmitEmployeeForm = async (values: IEmployeeCreate) => {
  console.log("values on fetching", values);
  const response = await APIAxiosInstance.post(`employee/post`, values);
  return response.data;
};

// Custom hook for the mutation
export const useSubmitEmployeerForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: IEmployeeCreate) => handleSubmitEmployeeForm(values),
    onSuccess: async (data: any) => {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: ["getEmployeeData"],
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
