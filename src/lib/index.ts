import axios from "axios";

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:8080" : process.env.NEXT_PUBLIC_BACKEND_URL;

if (!baseURL) {
  throw new Error("❌ BASE_URL is not defined in .env file");
}

export const APIAxiosInstance = axios.create({
  baseURL,
  timeout: 1000 * 60,
  withCredentials: true,
});

export const APIAxiosInstanceWithoutCredential = axios.create({
  baseURL,
  timeout: 1000 * 60,
  withCredentials: false,
});

export const httpHeader = (token?: string, isMultipart = false) => {
  const headers: Record<string, string> = {};

  if (token) headers.Authorization = `Bearer ${token}`;
  if (isMultipart) headers["Content-Type"] = "multipart/form-data";

  return { headers };
};
