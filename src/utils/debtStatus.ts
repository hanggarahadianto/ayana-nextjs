import { differenceInDays } from "date-fns";

export const calculateDaysLeft = (dueDate: string): number => {
  // console.log("due data", dueDate);
  const due = new Date(dueDate);
  const today = new Date();
  return differenceInDays(due, today);
};

export const formatDaysToDueMessage = (daysLeft: number): string => {
  if (isNaN(daysLeft)) return "Tanggal Tidak Valid";

  const absDays = Math.abs(daysLeft);

  if (daysLeft < 0) {
    if (absDays <= 15) return `Sudah Jatuh Tempo ${absDays} hari yang lalu`;

    const months = Math.floor(absDays / 30);
    const sisaHari = absDays % 30;

    if (months >= 1) {
      return `Sudah Jatuh Tempo ${months} bulan${sisaHari > 0 ? ` ${sisaHari} hari` : ""} yang lalu`;
    }

    // Fallback (jika belum genap sebulan)
    return `Sudah Jatuh Tempo ${absDays} hari yang lalu`;
  }

  if (daysLeft === 0) return "Jatuh Tempo Hari Ini";
  if (daysLeft <= 15) return `Jatuh Tempo ${daysLeft} hari lagi`;

  const months = Math.floor(daysLeft / 30);
  const sisaHari = daysLeft % 30;

  return `Jatuh Tempo ${months} bulan${sisaHari > 0 ? ` ${sisaHari} hari` : ""} lagi`;
};

export const formatPaidStatusMessage = (daysLeft: number): string => {
  if (isNaN(daysLeft)) return "Tanggal Tidak Valid";

  const absDays = Math.abs(daysLeft);

  if (daysLeft < 0) {
    if (absDays <= 15) return `Terlambat ${absDays} hari`;

    const months = Math.floor(absDays / 30);
    const sisaHari = absDays % 30;

    return `Terlambat ${months} bulan${sisaHari > 0 ? ` ${sisaHari} hari` : ""}`;
  }

  if (daysLeft === 0) return "Tepat Waktu";
  if (daysLeft <= 15) return `Lebih Cepat ${daysLeft} hari`;

  const months = Math.floor(daysLeft / 30);
  const sisaHari = daysLeft % 30;

  return `Lebih Cepat ${months} bulan${sisaHari > 0 ? ` ${sisaHari} hari` : ""}`;
};

export const formatEarlyOrLateTransaction = (transactionDate: string, dueDate: string): string => {
  const daysDiff = differenceInDays(new Date(dueDate), new Date(transactionDate));

  if (daysDiff < 0) {
    return `Terlambat ${Math.abs(daysDiff)} hari`;
  }

  if (daysDiff <= 5) {
    return "Tepat Waktu";
  }

  if (daysDiff > 10) {
    const months = Math.floor(daysDiff / 30);
    const days = daysDiff % 30;
    return `Lebih Cepat ${months > 0 ? `${months} bulan${days > 0 ? ` ${days} hari` : ""}` : `${days} hari`}`;
  }

  // Default fallback (contoh: 6–10 hari dianggap tetap tepat waktu)
  return `Tepat Waktu`;
};

export const getStatusColor = (daysLeft: number): "red" | "orange" | "green" => {
  if (daysLeft < 0) return "red";
  if (daysLeft <= 15) return "orange";
  return "green";
};

export const getColorForPaidStatus = (paidDate: string, dueDate: string): string => {
  const daysDiff = differenceInDays(new Date(dueDate), new Date(paidDate));

  if (daysDiff < 0) return "red"; // Terlambat
  if (daysDiff <= 5) return "green"; // Tepat Waktu (0 s/d 5 hari sebelum due date)
  return "blue"; // Lebih Cepat (> 5 hari sebelum due date)
};
