import { APIAxiosInstance } from "@/src/api";

export const getDataProductDetail = async ({ params }: { params: string }) => {
  try {
    const url = `home/getById/${params}`;

    const response = await APIAxiosInstance.get(url);
    // const response = await APIAxiosInstance.get(url, httpHeader(token));

    console.log("Response:", response.data.data);
    return response.data as ProductResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
