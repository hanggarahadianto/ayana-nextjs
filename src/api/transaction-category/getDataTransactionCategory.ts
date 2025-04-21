import { APIAxiosInstance } from "@/lib";

export const getDataTranasctionCategory = async (companyId: string, page = 1, limit: number, type?: string | null) => {
  if (!companyId) {
    console.error("Company ID tidak ada!");
    return;
  }

  try {
    let url = `transaction-category/get?company_id=${companyId}&page=${page}&limit=${limit}`;

    // ✅ Aktifkan parameter type, sesuai nama yang dipakai di backend: transaction_type
    if (type) {
      url += `&transaction_type=${encodeURIComponent(type)}`;
    }

    const response = await APIAxiosInstance.get(url);
    return response.data as ITransactionCategoryResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
