import { APIAxiosInstance } from "@/lib";

interface GetDataPresenceParams {
  companyId: string;
  page?: number;
  limit?: number;
  search?: string;
  isAgent: boolean;
  startDate?: string;
  endDate?: string;
  sortBy?: string | null;
  sortOrder?: string | null;
}

export const getDataPresence = async ({
  companyId,
  page = 1,
  limit = 10,
  search,
  isAgent,
  startDate,
  endDate,
  sortBy,
  sortOrder,
}: GetDataPresenceParams) => {
  if (!companyId) {
    console.error("Company ID tidak tersedia!");
    return;
  }

  const queryParams = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    limit: limit.toString(),
    is_agent: isAgent ? "true" : "false",
  });

  if (search) queryParams.set("search", search);
  if (startDate) queryParams.set("start_date", startDate);
  if (endDate) queryParams.set("end_date", endDate);
  if (sortBy) queryParams.set("sort_by", sortBy);
  if (sortOrder) queryParams.set("sort_order", sortOrder);

  const url = `employee/get/presence?${queryParams.toString()}`;
  const response = await APIAxiosInstance.get(url);

  return response.data as IPresenceResponse; // Pastikan tipe ini cocok
};
