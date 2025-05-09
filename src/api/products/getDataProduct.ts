import { APIAxiosInstanceWithoutCredential } from "../../lib";

interface GetDataProductParams {
  clusterId: string;
  page?: number;
  limit?: number;
}

export const getDataProductByClusterId = async ({ clusterId, page = 1, limit = 10 }: GetDataProductParams) => {
  try {
    const url = `home/getByClusterId/${clusterId}?page=${page}&limit=${limit}`;

    const response = await APIAxiosInstanceWithoutCredential.get(url);

    console.log("Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching homes by cluster ID:", error.message || error);
    throw error;
  }
};
