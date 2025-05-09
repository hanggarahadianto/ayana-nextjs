import { APIAxiosInstance, APIAxiosInstanceWithoutCredential } from "../../lib";

export const getDataCluster = async () => {
  try {
    const url = "cluster/get";

    // ✅ Panggil fungsi dengan ()
    const response = await APIAxiosInstanceWithoutCredential.get(url); // ⬅️ Tanpa header

    return response.data as IClusterResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
