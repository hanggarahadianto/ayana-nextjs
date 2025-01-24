import { APIAxiosInstance } from "@/src/api";

export const getDataProjectDetail = async (id: string) => {
  try {
    const url = `project/getById/${id}`;

    const response = await APIAxiosInstance.get(url);

    console.log("Response:", response.data.data);
    return response.data.data as IProject;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
