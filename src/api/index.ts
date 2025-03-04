import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.ayanagroup99.com";

export const APIAxiosInstance = axios.create({
  baseURL,
  timeout: 1000 * 60,
  // withCredentials: true, // ⬅️ Wajib untuk mengirim cookies!
});

// ✅ Fungsi header fleksibel
export const httpHeader = (token?: string, isMultipart = false) => {
  const headers: Record<string, string> = {};

  if (token) headers.Authorization = `Bearer ${token}`;
  if (isMultipart) headers["Content-Type"] = "multipart/form-data";

  return { headers };
};

export const httpWithoutHeader = () => {
  return { headers: { Authorization: undefined } }; // Pastikan header Authorization tidak dikirim
};
