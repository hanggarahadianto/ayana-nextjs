import { addDays, differenceInDays, parseISO, isValid } from "date-fns";

export function getProjectStatusDateWithColor(projectStart: string, projectTime: string) {
  if (!projectStart || !projectTime) {
    return {
      text: "Data tidak lengkap",
      sisaWaktu: null,
      color: "gray",
    };
  }

  const startDate = parseISO(projectStart);
  if (!isValid(startDate)) {
    return {
      text: "Tanggal mulai tidak valid",
      sisaWaktu: null,
      color: "gray",
    };
  }

  const duration = Number(projectTime) || 0;
  const plannedEndDate = addDays(startDate, duration);
  const today = new Date();

  const diffStartToNow = differenceInDays(today, startDate);
  const diffEndToNow = differenceInDays(today, plannedEndDate);

  if (diffStartToNow < 0) {
    return {
      text: `Belum mulai (mulai dalam ${Math.abs(diffStartToNow)} hari)`,
      sisaWaktu: null,
      color: "gray",
    };
  }

  if (diffEndToNow > 0) {
    return {
      text: `Terlambat ${diffEndToNow} hari`,
      sisaWaktu: null,
      color: "red",
    };
  }

  const sisaHari = Math.abs(diffEndToNow);
  return {
    text: `Berjalan ${diffStartToNow} hari`,
    sisaWaktu: `Sisa ${sisaHari} hari lagi`,
    color: "green",
  };
}
