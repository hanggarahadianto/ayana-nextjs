import { useMutation } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "@/lib";
import { AxiosError } from "axios";

interface APIErrorResponse {
  message?: string;
  error?: string;
  status?: string;
}

const handleSubmitCompanyForm = async (values: ICompanyCreate) => {
  const response = await APIAxiosInstance.post("/company/create", values);
  return response.data;
};

export const useSubmitCompany = (refetchCompanyData: () => void, closeModal: () => void) => {
  return useMutation<void, AxiosError<APIErrorResponse>, ICompanyCreate>({
    mutationFn: handleSubmitCompanyForm,
    onSuccess: () => {
      refetchCompanyData?.();
      closeModal?.();

      showNotification({
        title: "Berhasil",
        message: "Perusahaan berhasil ditambahkan",
        color: "green",
      });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || error.response?.data?.error || error.message || "Terjadi kesalahan saat menambahkan perusahaan";

      showNotification({
        title: "Gagal",
        message: errorMessage,
        color: "red",
      });
    },
  });
};
