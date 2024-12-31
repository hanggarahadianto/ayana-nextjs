import axios from "axios";

let baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const APIAxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 60,
});

export const httpHeader = (token: string) => {
  return { headers: { Authorization: token } };
};

export const httpHeaderMultipart = (token: string, isMultipart = false) => {
  const headers: Record<string, string> = { Authorization: token };

  // Only add Content-Type if it's a multipart request
  if (isMultipart) {
    // For multipart requests, Content-Type will be handled by FormData automatically.
    // But you can explicitly pass an empty object or just ensure headers are set correctly
    return { headers };
  }

  return { headers };
};
