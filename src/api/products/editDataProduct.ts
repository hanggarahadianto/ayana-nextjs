import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "../../lib";
import { useMutation } from "@tanstack/react-query";

// Handle the API call for updating the product
const handleEditProductForm = async (values: IProductCreate & { id: string }) => {
  try {
    const response = await APIAxiosInstance.put(`home/update`, values); // ID is inside the payload
    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      throw new Error((error as any).response?.data?.message || "An error occurred while updating the product");
    }
    throw new Error("An error occurred while updating the product");
  }
};

// Custom hook for editing product form
export const useEditProductForm = (refetchProductData: () => void, closeModal: () => void) => {
  return useMutation({
    mutationFn: (values: IProductCreate & { id: string }) => handleEditProductForm(values),
    onSuccess: (data: any) => {
      showNotification({
        title: "Data Berhasil Dikirim",
        message: "Produk berhasil diperbarui",
        color: "green",
      });
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
