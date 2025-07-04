import { APIAxiosInstanceWithoutCredential } from "../../lib";

interface GetDataProductParams {
  status?: string;
  page?: number;
  limit?: number;
}

export const getDataProduct = async ({ status, page = 1, limit = 10 }: GetDataProductParams) => {
  try {
    const queryParams = new URLSearchParams();

    queryParams.set("page", page.toString());
    queryParams.set("limit", limit.toString());

    if (status) {
      queryParams.set("status", status);
    }

    const url = `/home/get?${queryParams.toString()}`;
    const response = await APIAxiosInstanceWithoutCredential.get(url);

    return response.data as IProductResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching products:", error.message);
    } else {
      console.error("Unknown error fetching products:", error);
    }
    throw error;
  }
};
