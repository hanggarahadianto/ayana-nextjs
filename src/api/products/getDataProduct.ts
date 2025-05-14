import { APIAxiosInstanceWithoutCredential } from "../../lib";

interface GetDataProductParams {
  page?: number;
  limit?: number;
}

export const getDataProduct = async ({ page = 1, limit = 10 }: GetDataProductParams) => {
  try {
    const url = `home/get?page=${page}&limit=${limit}`;

    const response = await APIAxiosInstanceWithoutCredential.get(url);

    console.log("Response:", response.data);
    return response.data as IProductResponse;
  } catch (error: any) {
    console.error("Error fetching homes by cluster ID:", error.message || error);
    throw error;
  }
};
