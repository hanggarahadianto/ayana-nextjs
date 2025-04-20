import { APIAxiosInstance } from "@/lib";

// Definisikan interface untuk parameter
interface GetExpenseSummaryParams {
  companyId: string;
  page?: number;
  limit?: number;
  type?: string | null;
}

export const getExpenseSummary = async ({
  companyId,
  page = 1,
  limit = 10,
  type = null,
}: GetExpenseSummaryParams): Promise<IExpenseSummaryResponse> => {
  // Validasi companyId
  if (!companyId) {
    throw new Error("Company ID is required");
  }

  try {
    // Bangun URL dengan query parameters
    const queryParams = new URLSearchParams({
      company_id: companyId,
      page: page.toString(),
      limit: limit.toString(),
    });

    // Tambahkan type jika ada
    if (type) {
      queryParams.append("type", type);
    }

    const url = `finance/get-expense-summary?${queryParams.toString()}`;

    const response = await APIAxiosInstance.get(url);
    return response.data as IExpenseSummaryResponse;
  } catch (error: any) {
    console.error("Error fetching expense summary:", error.message || error);
    throw new Error(error.message || "Failed to fetch expense summary");
  }
};
