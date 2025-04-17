import { APIAxiosInstance } from "../../lib";

export const getDataWeeklyProgress = async (id: string) => {
  try {
    const url = `weeklyprogress/getById/${id}`;

    const response = await APIAxiosInstance.get(url);

    // console.log("Response:", response.data.data);
    return response.data as IWeeklyProgressResponse;
  } catch (error: any) {
    console.error("Error fetching data:", error.message || error);
    throw error;
  }
};
