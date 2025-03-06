import axios from "axios";

if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
  throw new Error("❌ NEXT_PUBLIC_BACKEND_URL is not defined in .env file");
}

// Dapatkan baseURL dari environment variable
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const APIAxiosInstance = axios.create({
  baseURL,
  timeout: 1000 * 60,
  withCredentials: true, // ⬅️ AKTIFKAN INI!
});

export const APIAxiosInstanceWithoutCredential = axios.create({
  baseURL,
  timeout: 1000 * 60, // Timeout 60 detik
  withCredentials: false, // Tidak mengirim kredensial (cookies, token)
});

// ✅ Fungsi header fleksibel
export const httpHeader = (token?: string, isMultipart = false) => {
  const headers: Record<string, string> = {};

  if (token) headers.Authorization = `Bearer ${token}`;
  if (isMultipart) headers["Content-Type"] = "multipart/form-data";

  return { headers };
};

export const httpWithoutHeader = () => {
  return {}; // ⬅️ Jangan kirim header kosong
};
