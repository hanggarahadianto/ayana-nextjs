import { APIAxiosInstance } from "@/lib";

interface GetDataCustomerParams {
  companyId: string;
  isAgent: boolean;
  page?: number;
  limit?: number;
  search?: string;
  statusCustomer?: string;
  selectStatus?: boolean;
  startDate?: string; // 👈 tambahkan
  endDate?: string; // 👈 tambahkan
}

export const getSalesData = async ({
  companyId,
  isAgent,
  page = 1,
  limit = 10,
  search,
  statusCustomer,
  selectStatus,
  startDate,
  endDate,
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
  if (startDate) queryParams.append("start_date", startDate); // <- gunakan format YYYY-MM-DD
  if (endDate) queryParams.append("end_date", endDate);

  const url = `marketing/get?${queryParams.toString()}`;

  const response = await APIAxiosInstance.get(url);
  return response.data as ISalesDashboardResponse;
};
