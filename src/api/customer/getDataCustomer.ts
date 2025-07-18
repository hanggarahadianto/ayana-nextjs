import { APIAxiosInstance } from "@/lib";

interface GetDataCustomerParams {
  companyId: string;
  page?: number;
  limit?: number;
  search?: string;
  statusCustomer?: string;
  selectStatus?: boolean;
  isAgent?: boolean;
  hasTestimony?: boolean;
  startDate?: string; // 👈 tambahkan
  endDate?: string; // 👈 tambahkan
  sortBy?: string | null;
  sortOrder?: string | null;
}

export const getDataCustomer = async ({
  companyId,
  page = 1,
  limit = 10,
  search,
  statusCustomer,
  selectStatus,
  isAgent,
  hasTestimony,
  startDate,
  endDate,
  sortBy,
  sortOrder,
}: GetDataCustomerParams) => {
  if (!companyId) {
    console.error("Company ID tidak tersedia!");
    return;
  }
  const queryParams = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    limit: limit.toString(),
  });

  queryParams.append("is_agent", isAgent ? "true" : "false");

  if (search) queryParams.append("search", search); // 🔍
  if (statusCustomer) queryParams.append("status", statusCustomer);
  if (selectStatus) queryParams.append("select_status", "true");
  queryParams.append("has_testimony", hasTestimony ? "true" : "false");

  if (startDate) queryParams.append("start_date", startDate); // <- gunakan format YYYY-MM-DD
  if (endDate) queryParams.append("end_date", endDate);
  if (sortBy) queryParams.append("sort_by", sortBy);
  if (sortOrder) queryParams.append("sort_order", sortOrder);

  const url = `customer/get?${queryParams.toString()}`;

  const response = await APIAxiosInstance.get(url);
  return response.data as ICustomerResponse;
};
