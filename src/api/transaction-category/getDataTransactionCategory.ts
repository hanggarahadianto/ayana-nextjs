import { APIAxiosInstance } from "@/lib";

export interface GetTransactionCategoryParams {
  companyId: string;
  page?: number;
  limit?: number;
  transactionType?: string | null;
  category?: string | null;
  status?: string | null;
  select?: boolean;
}

export const getDataTransactionCategory = async ({
  companyId,
  page = 1,
  limit = 10,
  transactionType,
  category,
  status,
  select = false,
}: GetTransactionCategoryParams) => {
  if (!companyId) {
    console.error("Company ID tidak ada!");
    return;
  }

  const params = new URLSearchParams();
  params.append("company_id", companyId);

  if (select) {
    params.append("select", "true");
  } else {
    params.append("page", String(page));
    params.append("limit", String(limit));
  }

  if (transactionType) {
    params.append("transaction_type", transactionType);
  }

  if (category) {
    params.append("category", category);
  }

  if (status) {
    params.append("status", status);
  }

  const url = `transaction-category/get?${params.toString()}`;
  const response = await APIAxiosInstance.get(url);
  return response.data as ITransactionCategoryResponse;
};
