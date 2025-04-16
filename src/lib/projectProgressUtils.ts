import { parseISO, compareDesc } from "date-fns";

export const progressProject = (weeklyProgressData: any[]) => {
  if (!weeklyProgressData || weeklyProgressData.length === 0) return 0;

  const sortedData = [...weeklyProgressData].sort((a, b) => compareDesc(parseISO(a.created_at), parseISO(b.created_at)));

  return sortedData[0]?.percentage ?? 0;
};

export const totalMaterialCost = (weeklyProgressData: any[]) => {
  if (!weeklyProgressData || weeklyProgressData.length === 0) return 0;

  return weeklyProgressData.reduce((acc, item) => {
    return acc + (item.amount_material || 0);
  }, 0);
};

export const totalWorkerCost = (weeklyProgressData: any[]) => {
  if (!weeklyProgressData || weeklyProgressData.length === 0) return 0;

  return weeklyProgressData.reduce((acc, item) => {
    return acc + (item.amount_worker || 0);
  }, 0);
};

export const toRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
