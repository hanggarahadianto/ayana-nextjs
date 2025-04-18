// ✅ BENAR: Data statis, bisa langsung dideklarasikan
export const locationOptions = [
  { value: "GAW", label: "GAW" },
  { value: "ABW", label: "ABW" },
];

export const typeOptions = [
  { value: "32 / 60", label: "32 / 60" },
  { value: "32 / 65", label: "32 / 65" },
  { value: "36 / 60", label: "36 / 60" },
  { value: "36 / 72", label: "36 / 72" },
  { value: "36 / 75", label: "36 / 75" },
  { value: "36 / 77", label: "36 / 77" },
  { value: "36 / 79", label: "36 / 79" },
  { value: "36 / 80", label: "36 / 80" },
  { value: "36 / 81", label: "36 / 81" },
  { value: "36 / 84", label: "36 / 84" },
  { value: "36 / 105", label: "36 / 105" },
  { value: "36 / 111", label: "36 / 111" },
  { value: "60 / 108", label: "36 / 108" },
  { value: "60 / 135", label: "60 / 135" },
];

export const availabilityOptions = [
  { value: "available", label: "Available" },
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
  { value: "Asset (Aset)", label: "Asset (Aset)" },
  { value: "Liability (Kewajiban)", label: "Liability (Kewajiban)" },
  { value: "Equity (Ekuitas)", label: "Equity (Ekuitas)" },
  { value: "Revenue (Pendapatan)", label: "Revenue (Pendapatan)" },
  { value: "Expense (Beban)", label: "Expense (Beban)" },
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
