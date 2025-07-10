import { APIAxiosInstance } from "@/lib";

interface GetDataPresenceRuleParams {
  companyId: string;
  page?: number;
  limit?: number;
}

export const getDataPresenceRule = async ({ companyId, page = 1, limit = 10 }: GetDataPresenceRuleParams) => {
  if (!companyId) {
    console.error("Company ID tidak tersedia!");
    return;
  }

  const queryParams = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    limit: limit.toString(),
  });

  const url = `employee/get/presence-rule?${queryParams.toString()}`;
  const response = await APIAxiosInstance.get(url);

  return response.data as IPresenceRuleResponse; // Pastikan tipe ini cocok
};
