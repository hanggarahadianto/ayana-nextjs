import { differenceInDays } from "date-fns";

export const calculateDaysLeft = (dueDate: string): number => {
  const due = new Date(dueDate);
  const today = new Date();
  return differenceInDays(due, today);
};

export const formatDaysToMonths = (daysLeft: number): string => {
  if (daysLeft < 0) return "Jatuh Tempo";
  if (daysLeft === 0) return "Hari Ini";
  if (daysLeft <= 15) return `${daysLeft} hari lagi`;
  const months = Math.floor(daysLeft / 30);
  return `${months} bulan lagi`;
};

export const getStatusColor = (daysLeft: number): "red" | "orange" | "green" => {
  if (daysLeft < 0) return "red";
  if (daysLeft <= 15) return "orange";
  return "green";
};
