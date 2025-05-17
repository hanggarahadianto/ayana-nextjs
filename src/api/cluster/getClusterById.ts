import { APIAxiosInstanceWithoutCredential } from "../../lib";

export const getDataClusterById = async (id: string) => {
  try {
    const url = `/cluster/getById/${id}`;
    const response = await APIAxiosInstanceWithoutCredential.get(url);

    return response?.data?.data as ICluster;
  } catch (error: any) {
    console.error("Error fetching cluster by ID:", error.message || error);
    throw error;
  }
};
