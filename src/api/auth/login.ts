import { useMutation } from "@tanstack/react-query";
import { APIAxiosInstance } from "@/src/api";

export const handleLogin = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await APIAxiosInstance.post("/auth/login", { username, password });

    console.log("AUTH", response);

    if (response.status === 200 && response.data?.status) {
      const userData = response.data.data.payload;

      const user: IUser = {
        ID: userData.ID,
        username: userData.username,
        role: userData.role,
      };

      return {
        token: response.data.data.token,
        user,
      };
    }
  } catch (error) {
    console.error("Login API Error:", error);
  }

  return { token: null, user: null };
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) => handleLogin(username, password),
  });
};
