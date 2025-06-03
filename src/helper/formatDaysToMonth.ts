export const formatDaysToMonths = (days: number): string => {
  const isLate = days < 0;
  const absDays = Math.abs(days);
  const months = Math.floor(absDays / 30);
  const remainingDays = absDays % 30;

  const monthPart = months > 0 ? `${months} bulan` : "";
  const dayPart = remainingDays > 0 ? `${remainingDays} hari` : "";

  const fullText = [monthPart, dayPart].filter(Boolean).join(" ");

  return isLate ? `Terlambat ${fullText}` : `Sisa ${fullText} lagi`;
};

// Modifikasi logika statusColor
//
