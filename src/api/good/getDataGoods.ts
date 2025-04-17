import { APIAxiosInstance } from "../../lib";

export const getDataGoods = async (cashFlowData?: { id: string }[]) => {
  if (!cashFlowData || cashFlowData.length === 0) {
    console.error("Tidak ada Cash Flow ID yang tersedia!");
    return [];
  }

  try {
    // Ambil semua `cash_flow_id` dan buat permintaan untuk masing-masing ID
    const requests = cashFlowData.map((cashFlow) =>
      APIAxiosInstance.get(`good/getByCashFlowId?cash_flow_id=${cashFlow.id}&page=1&limit=10000`)
    );

    // Jalankan semua request secara paralel
    const responses = await Promise.all(requests);

    // Gabungkan hasil dari semua request
    return responses.map((response) => response.data).flat(); // Flatten jika ada banyak hasil
  } catch (error: any) {
    console.error("Error fetching goods data:", error.message || error);
    throw error;
  }
};
