import { APIAxiosInstance } from "../../lib";

interface GetUserByIdParams {
  id?: string; // UUID user
}

export const getUserByIdForSuperadmin = async ({ id }: GetUserByIdParams) => {
  try {
    const url = `user/get-by-id/${id}`;
    const response = await APIAxiosInstance.get(url);
    return response.data as IUserResponse; // ganti sesuai interface user yang kita buat
  } catch (error: any) {
    // console.error("Error fetching user data:", error.message || error);
    throw error;
  }
};
