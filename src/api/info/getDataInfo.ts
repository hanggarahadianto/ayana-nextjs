import { APIAxiosInstance } from "..";

export const getDataInfo = async (id: any): Promise<IInfo | null> => {
  try {
    const url = `info/get/${encodeURIComponent(id)}`;
    const response = await APIAxiosInstance.get(url);
    // console.log("RESPONSE", response);

    if (response.data.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
      return response.data.data[0] as IInfo;
    } else {
      // Return null or an empty object if no data is found
      return null;
    }
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);

    return null;
  }
};
