// src/api/transaction-category/getDataTransactionCategory.ts

import { APIAxiosInstance } from "@/lib";

export interface GetTransactionCategoryParams {
  companyId: string;
  page?: number;
  limit?: number;
  transactionType?: string | null;
  category?: string | null;
  status?: string | null;
  select?: boolean;
  selectByCategory?: boolean;
}

export const getDataTransactionCategory = async ({
  companyId,
  page = 1,
  limit = 10,
  transactionType,
  category,
  status,
  select = false,
  selectByCategory = false, // ✅ tambahkan default
}: GetTransactionCategoryParams) => {
  if (!companyId) {
    console.error("Company ID tidak ada!");
    return;
  }

  let url = `transaction-category/get?company_id=${companyId}`;

  if (select) {
    url += `&select=true`;
  } else {
    url += `&page=${page}&limit=${limit}`;
  }

  if (selectByCategory) {
    url += `&selectByCategory=true`; // ✅ tambahkan parameter
  }

  if (transactionType) {
    url += `&transaction_type=${encodeURIComponent(transactionType)}`;
  }

  if (category) {
    url += `&category=${encodeURIComponent(category)}`;
  }

  if (status) {
    url += `&status=${encodeURIComponent(status)}`;
  }

  const response = await APIAxiosInstance.get(url);
  return response.data as ITransactionCategoryResponse;
};
