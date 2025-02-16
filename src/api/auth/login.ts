import { APIAxiosInstance } from "@/src/api";

export const handleLogin = async (username: string, password: string): Promise<IAuth> => {
  try {
    const response = await APIAxiosInstance.post("/auth", { username, password });

    if (response.status === 200 && response.data?.status) {
      return {
        token: response.data.data.token,
        user: response.data.data.payload,
      };
    }
  } catch (error) {
    console.error("Login API Error:", error);
  }

  return { token: null, user: null }; // Always return a valid structure
};
