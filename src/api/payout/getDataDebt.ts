import { APIAxiosInstance } from "..";

export const getDataDebt = async (companyId: string) => {
  if (!companyId) {
    console.error("Company ID tidak ada!");
    return;
  }

  try {
    const url = `payout/debt/get?company_id=${companyId}`; // Tanpa "/" di awal

    console.log("Fetching URL:", url);

    const response = await APIAxiosInstance.get(url);
    console.log("Debt Response:", response.data);

    return response.data as IPayoutResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
