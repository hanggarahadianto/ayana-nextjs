// ✅ BENAR: Data statis, bisa langsung dideklarasikan
export const locationOptions = [
  { value: "GAW", label: "GAW" },
  { value: "ABW", label: "ABW" },
];

export const availabilityOptions = [
  { value: "available", label: "Available" },
  { value: "sold", label: "Sold" },
];

export const houseSaleStatuses = [
  { value: "booking", label: "Pengajuan Pesanan (Booking)" },
  { value: "bank_processing", label: "Proses Bank (Bank Processing)" },
  { value: "approved_by_bank", label: "Disetujui Bank (Approved By Bank)" },
  { value: "rejected_by_bank", label: "Ditolak Bank (Rejected By Bank)" },
  { value: "credit_agreement", label: "Akad Kredit (Credit Aggrement)" },
  { value: "under_construction", label: "Dalam Pembangunan (Under Construction)" },
  { value: "construction_completed", label: "Pembangunan Selesai (Construction Completed)" },
  { value: "handover", label: "Serah Terima ke Pembeli (Handover)" },
  { value: "canceled", label: "Dibatalkan (Cenceled)" },
];

export const paymentMethods = [
  { value: "cash", label: "Tunai" },
  { value: "cash_installment", label: "Cicilan" }, // cicilan langsung ke developer
  { value: "kpr", label: "KPR" },
  { value: "kpr_subsidized", label: "KPR Subsidi" }, // KPR FLPP atau subsidi pemerintah
  { value: "construction_progress", label: "Termin" },
];

export const satuan: string[] = [
  "Pcs",
  "Sak",
  "Orang",
  "Kg",
  "Dus",
  "Lembar",
  "Kotak",
  "Dam",
  "Galon",
  "Liter",
  "Rol",
  "Batang",
  "Kol",
  "M2",
  "Ton",
  "Pail",
];
export const allWeeks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

export const paymentCategory = [
  { value: "tunai", label: "Tunai" },
  { value: "tempo", label: "Tempo" },
];
export const paymentStatus = [
  { value: "paid", label: "Tunai" },
  { value: "unpaid", label: "Tenor" },
];
export const transactionTypeOptions = [
  { value: "payin", label: "Payin" },
  { value: "payout", label: "Payout" },
];

export const projectDuration = [
  { value: "35", label: "35 Hari" },
  { value: "65", label: "65 Hari" },
  { value: "95", label: "95 Hari" },
  { value: "125", label: "125 Hari" },
  { value: "150", label: "150 Hari" },
];

export const investmentOption = [
  { value: "Lump Sum", label: "Lump Sum" },
  { value: "Installment Payment", label: "Installment Payment" },
];

export const accountTypeOptions = [
  { value: "Asset", label: "Asset (Aset)" },
  { value: "Liability", label: "Liability (Kewajiban)" },
  { value: "Equity", label: "Equity (Ekuitas)" },
  { value: "Revenue", label: "Revenue (Pendapatan)" },
  { value: "Expense", label: "Expense (Beban)" },
];

export const transactionStatusOption = {
  draft: {
    label: "Draft",
    color: "gray",
  },
  approved: {
    label: "Disetujui",
    color: "blue",
  },
  paid: {
    label: "Lunas",
    color: "green",
  },
  unpaid: {
    label: "Belum Lunas",
    color: "orange",
  },
  cancelled: {
    label: "Dibatalkan",
    color: "red",
  },
} as const;

export type TransactionStatus = keyof typeof transactionStatusOption;

export const ValidCategories: Record<string, string[]> = {
  Asset: ["Kas & Bank", "Barang Dagangan", "Piutang", "Perlengkapan", "Aset Tetap"],
  Liability: ["Hutang Dagang", "Pinjaman", "Kewajiban Lancar", "Pajak", "Pembayaran Bagi Hasil", "Hutang Usaha"],
  Equity: ["Modal", "Laba Ditahan"],
  Revenue: ["Penjualan", "Jasa", "Pencairan", "Pendapatan Dari Bunga"],
  Expense: ["Operasional", "Utilitas", "Non Operasional"],

  // COGS: ["Persediaan", "Tenaga Kerja", "Biaya Lain"],
};

export const transactionLabel = [
  { value: "Penjualan", label: "Penjualan" },
  { value: "Pencairan", label: "Pencairan" },
  { value: "Penerimaan", label: "Penerimaan" },
  { value: "Pinjaman", label: "Pinjaman" },
  { value: "Piutang", label: "Piutang" },
  { value: "Pelunasan", label: "Pelunasan" },
  { value: "Pembelian", label: "Pembelian" },
  { value: "Pembayaran", label: "Pembayaran" },
  { value: "Pengeluaran", label: "Pengeluaran" },
];
