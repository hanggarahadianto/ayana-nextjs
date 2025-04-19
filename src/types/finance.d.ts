// types/cashSummary.ts
interface ISummaryItem {
  id: string; // Misalnya, ID transaksi atau item dalam summary
  description: string; // Deskripsi dari item summary
  amount: number; // Jumlah atau nilai transaksi
  date: string; // Tanggal terkait dengan transaksi atau item
  status: string; // Status transaksi (misalnya: "paid", "unpaid")
}

interface ICashSummaryData {
  summary: SummaryItem[]; // Daftar ringkasan transaksi atau item
  net_assets: number; // Total aset bersih
  available_cash: number;
  message: string; // Pesan terkait pengambilan data
  status: string; // Status dari pengambilan data
}
