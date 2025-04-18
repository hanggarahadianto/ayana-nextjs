import { APIAxiosInstance } from "@/lib";

export const getDataAccount = async (companyId: string, page = 1, limit: number, type?: string | null) => {
  if (!companyId) {
    console.error("Company ID tidak ada!");
    return;
  }

  console.log("TYPE", type);

  try {
    let url = `account/get?company_id=${companyId}&page=${page}&limit=${limit}`;
    if (type) {
      url += `&type=${encodeURIComponent(type)}`;
    }

    console.log("url dapatkan select", url);

    const response = await APIAxiosInstance.get(url);
    return response.data as IAccountResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
