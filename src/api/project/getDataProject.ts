import { APIAxiosInstance } from "../../lib";

interface GetDataProjectParams {
  companyId?: string;
  page?: number;
  limit?: number;
  selectedCategory?: string;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}

export const getDataProject = async ({
  companyId,
  page = 1,
  limit = 10,
  selectedCategory,
  startDate,
  endDate,
  searchTerm,
}: GetDataProjectParams): Promise<IProjectResponse | undefined> => {
  try {
    if (!companyId) {
      console.error("❌ Company ID tidak tersedia!");
      return;
    }

    const queryParams = new URLSearchParams({
      company_id: companyId,
      page: page.toString(),
      limit: limit.toString(),
    });

    if (selectedCategory) queryParams.append("category", selectedCategory);
    if (startDate) queryParams.append("start_date", startDate);
    if (endDate) queryParams.append("end_date", endDate);
    if (searchTerm) queryParams.append("search", searchTerm);

    const url = `project/get?${queryParams.toString()}`;
    const response = await APIAxiosInstance.get(url);
    return response.data as IProjectResponse;
  } catch (error: any) {
    console.error("❌ Error fetching project data:", error.message || error);
    throw error;
  }
};
