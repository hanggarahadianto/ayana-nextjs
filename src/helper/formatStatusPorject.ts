import { addDays, differenceInDays, parseISO } from "date-fns";

export function getProjectStatusDateWithColor(projectStart: string, projectTime: string) {
  const startDate = parseISO(projectStart);
  const duration = parseInt(projectTime, 10);
  const plannedEndDate = addDays(startDate, duration);
  const today = new Date();

  const diffStartToNow = differenceInDays(today, startDate);
  const diffEndToNow = differenceInDays(today, plannedEndDate);

  if (diffStartToNow < 0) {
    return {
      text: `Belum mulai (mulai dalam ${Math.abs(diffStartToNow)} hari)`,
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
