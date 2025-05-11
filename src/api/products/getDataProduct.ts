import { APIAxiosInstanceWithoutCredential } from "../../lib";

interface GetDataProductParams {
  clusterId: string;
  page?: number;
  limit?: number;
}

export const getDataProduct = async ({ clusterId, page = 1, limit = 10 }: GetDataProductParams) => {
  try {
    const url = `home/get${clusterId}?page=${page}&limit=${limit}`;

    const response = await APIAxiosInstanceWithoutCredential.get(url);

    console.log("Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching homes by cluster ID:", error.message || error);
    throw error;
  }
};
