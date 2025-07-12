import { APIAxiosInstance } from "@/lib";

interface GetDataPresenceParams {
  companyId: string;
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string | null;
  sortOrder?: string | null;
  presenceType?: "all" | "arrival" | "departure"; // ➕ Tambahan baru
}

export const getDataPresence = async ({
  companyId,
  page = 1,
  limit = 10,
  search,
  startDate,
  endDate,
  sortBy,
  sortOrder,
  presenceType = "all",
}: GetDataPresenceParams) => {
  if (!companyId) {
    console.error("❌ Company ID tidak tersedia!");
    return;
  }

  const queryParams = new URLSearchParams({
    company_id: companyId,
    page: String(page),
    limit: String(limit),
  });

  // Tambahkan filter
  if (search) queryParams.set("search", search);
  if (startDate) queryParams.set("start_date", startDate);
  if (endDate) queryParams.set("end_date", endDate);
  if (sortBy) queryParams.set("sort_by", sortBy);
  if (sortOrder) queryParams.set("sort_order", sortOrder);

  // ✅ Tambahkan filter arrival_only / departure_only
  if (presenceType === "arrival") queryParams.set("arrival_only", "true");
  if (presenceType === "departure") queryParams.set("departure_only", "true");

  const url = `/employee/get/presence?${queryParams.toString()}`;
  const response = await APIAxiosInstance.get(url);

  return response.data as IPresenceResponse;
};
