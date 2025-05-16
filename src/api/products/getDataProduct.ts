import { APIAxiosInstanceWithoutCredential } from "../../lib";

interface GetDataProductParams {
  status?: string;
  page?: number;
  limit?: number;
}

export const getDataProduct = async ({ status, page = 1, limit = 10 }: GetDataProductParams) => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (status) {
      queryParams.append("status", status);
    }

    const url = `/home/get?${queryParams.toString()}`;
    const response = await APIAxiosInstanceWithoutCredential.get(url);

    // console.log("Response:", response.data);
    return response.data as IProductResponse;
  } catch (error: any) {
    console.error("Error fetching homes:", error.message || error);
    throw error;
  }
};
