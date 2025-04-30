import { APIAxiosInstance } from "../../lib";

export const getDataProject = async () => {
  try {
    const url = `project/get`;

    const response = await APIAxiosInstance.get(url);
    return response.data as IProjectResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
