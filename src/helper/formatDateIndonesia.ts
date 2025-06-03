import { format, endOfDay } from "date-fns";

export const formatDateIndonesia = (dateString: string | Date): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

// helper.ts

export function formatDateRange(startDate?: Date, endDate?: Date): { formattedStartDate?: string; formattedEndDate?: string } {
  return {
    formattedStartDate: startDate ? format(startDate, "yyyy-MM-dd") : undefined,
    formattedEndDate: endDate ? format(endOfDay(endDate), "yyyy-MM-dd") : undefined,
  };
}
