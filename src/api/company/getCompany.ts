import { APIAxiosInstance } from "../../lib";

export const getDataCompany = async () => {
  try {
    const url = "company/get";

    const response = await APIAxiosInstance.get(url);

    // console.log("Response:", response.data.data);
    return response.data as ICompanyResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
