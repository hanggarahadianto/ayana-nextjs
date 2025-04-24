import { APIAxiosInstance } from "@/lib";

// ✅ update fungsi ini
interface GetOutstandingDebtParams {
  companyId: string;
  transactionType?: string;
  transactionStatus: string;
  page?: number;
  limit?: number;
  summaryOnly?: boolean;
}

export const getOutstandingDebt = async ({
  companyId,
  transactionType,
  transactionStatus,
  page = 1,
  limit = 10,
  summaryOnly,
}: GetOutstandingDebtParams): Promise<IDebtSummaryResponse | undefined> => {
  if (!companyId) {
    console.error("Company ID tidak tersedia!");
    return;
  }

  const queryParams = new URLSearchParams({
    company_id: companyId,
    // transaction_type: transactionType,
    status: transactionStatus,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (transactionType) {
    queryParams.append("transaction_type", transactionType);
  }

  if (summaryOnly) {
    queryParams.append("summary_only", "true");
  }

  const url = `/finance/get-outstanding-debt?${queryParams.toString()}`;

  try {
    const response = await APIAxiosInstance.get(url);
    return response.data as IDebtSummaryResponse;
  } catch (error: any) {
    console.error("Gagal mengambil data outstanding debt:", error.message || error);
    throw error;
  }
};
