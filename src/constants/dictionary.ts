// ✅ BENAR: Data statis, bisa langsung dideklarasikan
export const locationOptions = [
  { value: "GAW", label: "GAW" },
  { value: "ABW", label: "ABW" },
];

export const typeOptions = [
  { value: "32 / 60", label: "32 / 60" },
  { value: "32 / 65", label: "32 / 65" },
  { value: "36 / 72", label: "36 / 72" },
  { value: "36 / 75", label: "36 / 75" },
  { value: "36 / 77", label: "36 / 77" },
  { value: "36 / 79", label: "36 / 79" },
  { value: "36 / 80", label: "36 / 80" },
  { value: "36 / 81", label: "36 / 81" },
  { value: "36 / 84", label: "36 / 84" },
  { value: "36 / 105", label: "36 / 105" },
  { value: "36 / 111", label: "36 / 111" },
  { value: "45 / 80", label: "36 / 80" },
  { value: "45 / 88", label: "36 / 88" },
  { value: "60 / 108", label: "36 / 108" },
  { value: "60 / 135", label: "60 / 135" },
  { value: "60 / 160", label: "60 / 160" },
];

export const availabilityOptions = [
  { value: "available", label: "Available" },
  { value: "sold", label: "Sold" },
];

export const statusOptions = [
  { value: "done", label: "Done" },
  { value: "booking", label: "Booking" },
  { value: "progress", label: "Progress" },
  { value: "sold", label: "Sold" },
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
  Asset: ["Kas & Bank", "Piutang", "Perlengkapan", "Aset Tetap"],
  Liability: ["Utang Dagang", "Pinjaman", "Kewajiban Lancar", "Pajak", "Pembayaran Bagi Hasil", "Hutang Usaha"],
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
  { value: "Pembelian", label: "Pembelian" },
  { value: "Pembayaran", label: "Pembayaran" },
  { value: "Pengeluaran", label: "Pengeluaran" },
];
