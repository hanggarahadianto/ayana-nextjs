import { APIAxiosInstance } from "@/src/api";

export const getDataProject = async () => {
  try {
    const url = `project/get`;

    const response = await APIAxiosInstance.get(url);

    console.log("Response:", response.data.data);
    return response.data as IProjectResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
