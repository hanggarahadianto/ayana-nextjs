import { APIAxiosInstance } from "@/lib";

export interface ITransactionCategorySelectByCategoryResponse {
  data: string[];
  status: string;
}

export const getTransactionCategoryByCategoryOnly = async (companyId: string): Promise<ITransactionCategorySelectByCategoryResponse> => {
  const url = `transaction-category/get?company_id=${companyId}&selectByCategory=true`;
  const response = await APIAxiosInstance.get(url);
  return response.data as ITransactionCategorySelectByCategoryResponse;
};
