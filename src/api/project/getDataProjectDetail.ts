import { APIAxiosInstance } from "../../lib";

export const getDataProjectDetail = async (id: string) => {
  try {
    const url = `project/getById/${id}`;

    const response = await APIAxiosInstance.get(url);

    return response.data.data as IProjectItem;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
