import { APIAxiosInstance } from "@/src/api";

export const getDataProductDetail = async (id: string) => {
  try {
    const url = `home/getById/${id}`;

    const response = await APIAxiosInstance.get(url);

    return response.data.data as IProduct;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
