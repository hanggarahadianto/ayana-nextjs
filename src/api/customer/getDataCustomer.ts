import { APIAxiosInstance } from "@/lib";

interface GetDataCustomerParams {
  page?: number;
  limit?: number;
  startDate?: string; // 👈 tambahkan
  endDate?: string; // 👈 tambahkan
}

export const getDataCustomer = async ({ page = 1, limit = 10, startDate, endDate }: GetDataCustomerParams) => {
  const params = new URLSearchParams({});

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (startDate) queryParams.append("start_date", startDate); // <- gunakan format YYYY-MM-DD
  if (endDate) queryParams.append("end_date", endDate);

  const url = `customer/get?${params.toString()}`;
  // console.log("URL request:", url);

  const response = await APIAxiosInstance.get(url);
  return response.data as ICustomerResponse;
};
