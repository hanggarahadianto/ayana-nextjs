import { APIAxiosInstance } from "../../lib";

interface GetCompanyParams {
  user_id: string; // UUID user yang sedang login / actor
  page?: number; // default 1
  limit?: number; // default 10
}

export const getDataCompanyByUser = async (params: GetCompanyParams) => {
  try {
    const url = "company/get-by-user";

    const response = await APIAxiosInstance.get(url, {
      params: {
        user_id: params.user_id,
        page: params.page ?? 1,
        limit: params.limit ?? 10,
      },
    });

    return response.data as ICompanyResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
