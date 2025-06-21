import { differenceInMonths } from "date-fns";

export const calculateTotalBagiHasil = (
  entry: {
    amount: number;
    date_inputed: string | Date | null;
    due_date: string | Date | null;
  },
  percentage: number
) => {
  if (!entry.date_inputed || !entry.due_date) {
    return { totalBagiHasil: 0, selisihBulan: 0 };
  }

  const startDate = new Date(entry.date_inputed);
  const endDate = new Date(entry.due_date);

  let selisihBulan = differenceInMonths(endDate, startDate);
  if (selisihBulan < 1) selisihBulan = 1;

  const bagiHasilPerBulan = entry.amount * (percentage / 100);
  const totalBagiHasil = bagiHasilPerBulan * selisihBulan;

  return { totalBagiHasil, selisihBulan };
};
