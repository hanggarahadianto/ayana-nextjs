import { getCashSummary } from "@/api/finance/getCashSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";

type CashInStatsProps = {
  companyId?: string;
};

export const CashInStats = ({ companyId }: CashInStatsProps) => {
  const { data: cashSummaryOnlyData, isPending: isLoadingSummary } = useQuery({
    queryKey: ["getSummaryOnlyData", companyId],
    queryFn: () => getCashSummary(companyId || "", 1, 10, "", true),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalCashIn = cashSummaryOnlyData?.data?.total_cashin ?? 0;

  const statsData: StatItem[] = [
    {
      title: "Total Cash In",
      icon: "receipt",
      value: totalCashIn,
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
    },
  ];

  return <StatsGrid data={statsData} />;
};
