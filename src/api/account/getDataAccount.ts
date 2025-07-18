import { APIAxiosInstance } from "@/lib";

interface GetDataAccountParams {
  companyId: string;
  page?: number;
  limit?: number;
  selectedType?: string | null;
  category?: string | null;
  category_only?: string | boolean;
  all: boolean;
}

export const getDataAccount = async ({
  companyId,
  page = 1,
  limit = 10,
  selectedType,
  category,
  category_only,
  all,
}: GetDataAccountParams) => {
  if (!companyId) {
    console.error("Company ID tidak ada!");
    return;
  }

  const params = new URLSearchParams({
    company_id: companyId,
  });

  if (category_only === "true" || category_only === true) {
    params.append("category_only", "true");
  } else {
    params.append("page", String(page));
    params.append("limit", String(limit));
  }
  if (all) params.append("all", String(true));
  if (selectedType) params.append("type", selectedType);
  if (category) params.append("category", category);

  const url = `account/get?${params.toString()}`;

  const response = await APIAxiosInstance.get(url);
  return response.data as IAccountResponse;
};
