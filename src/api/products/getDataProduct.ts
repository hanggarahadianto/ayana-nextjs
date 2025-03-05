import { APIAxiosInstance, httpWithoutHeader } from "..";

export const getDataProduct = async () => {
  try {
    const url = "home/get";

    // ✅ Panggil fungsi dengan ()
    const response = await APIAxiosInstance.get(url); // ⬅️ Tanpa header

    console.log("Response:", response.data.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
