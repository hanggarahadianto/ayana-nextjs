import { APIAxiosInstance } from "@/lib";

export const getDataTranasctionCategory = async (
  companyId: string,
  page = 1,
  limit: number,
  type?: string | null,
  category?: string | null
) => {
  if (!companyId) {
    console.error("Company ID tidak ada!");
    return;
  }

  try {
    let url = `transaction-category/get?company_id=${companyId}&page=${page}&limit=${limit}`;

    if (type) {
      url += `&transaction_type=${encodeURIComponent(type)}`;
    }

    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }

    const response = await APIAxiosInstance.get(url);
    return response.data as ITransactionCategoryResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
