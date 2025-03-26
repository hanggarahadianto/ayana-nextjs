import { useMutation } from "@tanstack/react-query"; // Correct import from '@tanstack/react-query'
import { showNotification } from "@mantine/notifications";
import { APIAxiosInstance } from "..";

const handleEditGoodForm = async (values: IGoods[]) => {
  console.log("values on fetching", values);
  const response = await APIAxiosInstance.put("good/edit", values);
  return response.data; // Return the response data
};

// Custom hook for the mutation
export const useEditGoodForm = () => {
  return useMutation({
    // mutationFn: ({ values }: { values: IGoodsCreate[] }) => handleEditGoodForm(values),
    mutationFn: (values: any) => handleEditGoodForm(values), // Terima values langsung tanpa membungkus dalam objek

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
