import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type IEmployeeUpdateWithoutId = Omit<IEmployeeUpdate, "id">;

const handleUpdateEmployeeForm = async (values: IEmployeeUpdateWithoutId, id: string) => {
  try {
    const response = await APIAxiosInstance.put(`employee/edit/${id}`, values);
    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      throw new Error((error as any).response?.data?.message || "Terjadi kesalahan saat memperbarui data karyawan");
    }
    throw new Error("Terjadi kesalahan saat memperbarui data karyawan");
  }
};

export const useUpdateEmployeeForm = (closeModal: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, IEmployeeUpdate & { id: string }>({
    mutationFn: (values) => {
      const { id, ...rest } = values;
      return handleUpdateEmployeeForm(rest, id);
    },

    onSuccess: async (data) => {
      if (data) {
        await queryClient.refetchQueries({
          queryKey: ["getEmployeeData"],
          exact: false,
        });
      }
      showNotification({
        title: "Data Berhasil Diperbarui",
        message: "Data karyawan berhasil diperbarui",
        color: "green",
      });
      closeModal();
    },

    onError: (error: Error) => {
      showNotification({
        title: "Gagal Memperbarui Data",
        message: error.message || "Terjadi kesalahan",
        color: "red",
      });
    },
  });
};
