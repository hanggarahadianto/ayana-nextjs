import { APIAxiosInstance } from "@/lib";

interface GetDataCustomerParams {
  companyId: string;
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string; // 👈 tambahkan
  endDate?: string; // 👈 tambahkan
}

export const getDataCustomer = async ({ companyId, page = 1, limit = 10, search, startDate, endDate }: GetDataCustomerParams) => {
  if (!companyId) {
    console.error("Company ID tidak tersedia!");
    return;
  }
  const queryParams = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) queryParams.append("search", search); // 🔍
  if (startDate) queryParams.append("start_date", startDate); // <- gunakan format YYYY-MM-DD
  if (endDate) queryParams.append("end_date", endDate);

  const url = `customer/get?${queryParams.toString()}`;

  const response = await APIAxiosInstance.get(url);
  return response.data as ICustomerResponse;
};
