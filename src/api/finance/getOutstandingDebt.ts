import { APIAxiosInstance } from "@/lib";

// ✅ update fungsi ini
interface GetOutstandingDebtParams {
  companyId: string;
  page?: number;
  limit?: number;
  status: string;
  summaryOnly?: boolean;
  search?: string;
}

export const getOutstandingDebt = async ({
  companyId,

  page = 1,
  limit = 10,
  status,
  summaryOnly,
  search,
}: GetOutstandingDebtParams): Promise<IDebtSummaryResponse | undefined> => {
  if (!companyId) {
    console.error("Company ID tidak tersedia!");
    return;
  }

  const queryParams = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (summaryOnly) queryParams.append("summary_only", "true");
  if (status) queryParams.append("status", status);
  if (search) queryParams.append("search", search); // 🔍

  const url = `/finance/get-outstanding-debt?${queryParams.toString()}`;

  try {
    const response = await APIAxiosInstance.get(url);
    return response.data as IDebtSummaryResponse;
  } catch (error: any) {
    console.error("Gagal mengambil data outstanding debt:", error.message || error);
    throw error;
  }
};
