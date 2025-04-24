import { getCashSummary } from "@/api/finance/getCashSummary";
import { getExpenseSummary } from "@/api/finance/getExpenseSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";

type AvailableCashStatsProps = {
  companyId?: string;
  data: number;
};

export const AvaialbleCashStats = ({ data }: AvailableCashStatsProps) => {
  const statsData: StatItem[] = [
    {
      title: "Total Available Cash",
      icon: "receipt",
      value: data,
      color: "white",
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
    },
  ];

  return <StatsGrid data={statsData} />;
};
