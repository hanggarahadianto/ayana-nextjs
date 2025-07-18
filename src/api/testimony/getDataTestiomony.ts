import { APIAxiosInstance } from "@/lib";

interface GetDataTestimonyParams {
  companyId: string;
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string | null;
  sortOrder?: string | null;
}

export const getDataTestimony = async ({
  companyId,
  page = 1,
  limit = 10,
  search,
  startDate,
  endDate,
  sortBy,
  sortOrder,
}: GetDataTestimonyParams) => {
  if (!companyId) {
    console.error("Company ID tidak tersedia!");
    return;
  }

  const queryParams = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) queryParams.append("search", search);
  if (startDate) queryParams.append("start_date", startDate);
  if (endDate) queryParams.append("end_date", endDate);
  if (sortBy) queryParams.append("sort_by", sortBy);
  if (sortOrder) queryParams.append("sort_order", sortOrder);

  const url = `customer/testimony/get?${queryParams.toString()}`;

  const response = await APIAxiosInstance.get(url);
  return response.data as ITestimonyResponse;
};
