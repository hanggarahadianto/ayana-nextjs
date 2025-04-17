import { APIAxiosInstance } from "../../lib";

export const getDataPayout = async (companyId: string) => {
  console.log("COMPANY ID UNTUK DI DAPAT DI PAYOUT", companyId);
  console.log("COMPANY ID UNTUK PAYOUT:", companyId);
  if (!companyId) {
    console.error("Company ID tidak ada!");
    return;
  }

  try {
    const url = `payout/get?company_id=${companyId}`; // Tanpa "/" di awal

    console.log("Fetching URL:", url);

    const response = await APIAxiosInstance.get(url);
    console.log("Payout Response:", response.data);

    return response.data as IPayoutResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
