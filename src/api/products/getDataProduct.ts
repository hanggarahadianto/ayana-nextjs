import { APIAxiosInstance } from "@/src/api";

export const getDataProduct = async () => {
  try {
    // const url = `property-personnel/get?vendor_id=${encodeURIComponent(
    //   // vendor_id
    // )}`;
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
