import { getAssetSummary } from "@/api/finance/getAssetSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";

type AvailableCashStatsProps = {
  title?: string;
  totalCashIn: number;
  totalCashOut: number;
  loadingIn?: boolean;
  loadingOut?: boolean;
};

export const AvailableCashStats = ({ title, totalCashIn, totalCashOut, loadingIn, loadingOut }: AvailableCashStatsProps) => {
  const availableCash = totalCashIn - Math.abs(totalCashOut);

  const statsData: StatItem[] = [
    {
      title: title ?? "Saldo Tersedia",
      icon: "receipt",
      value: availableCash,
      color: "blue",
      diff: 0, // Optional: bisa kamu hitung dari data sebelumnya
      loading: loadingIn || loadingOut,
    },
  ];

  return <StatsGrid data={statsData} />;
};
