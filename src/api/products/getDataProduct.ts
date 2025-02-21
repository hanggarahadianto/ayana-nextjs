import { APIAxiosInstance } from "..";

export const getDataProduct = async () => {
  try {
    const url = `home/get`;

    const response = await APIAxiosInstance.get(url);
    // const response = await APIAxiosInstance.get(url, httpHeader(token));

    console.log("Response:", response.data.data);
    return response.data as IProductResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
