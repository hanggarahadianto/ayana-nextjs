import { APIAxiosInstance } from "..";

export const getDataProduct = async () => {
  try {
    const url = "home/get";

    // ✅ Pastikan Axios mengirim cookies
    const response = await APIAxiosInstance.get(url, {
      withCredentials: true,
    });

    console.log("Response:", response.data.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
