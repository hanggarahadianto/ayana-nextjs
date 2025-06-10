import { getRevenueSummary } from "@/api/finance/getRevenueSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type RevenueStatsProps = {
  companyId?: string;
  revenueType?: string;
  onLoaded?: (val: number) => void; // <--- tambahkan ini
};

export const RevenueStats = ({ companyId, revenueType, onLoaded }: RevenueStatsProps) => {
  const { data: revenueData, isPending: isLoadingCashinData } = useQuery({
    queryKey: ["getRevenueData", companyId, revenueType],
    queryFn: () =>
      getRevenueSummary({
        companyId: companyId!,
        revenueType: "realized",
        summaryOnly: true,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalRevenue = revenueData?.data?.total_revenue ?? 0;

  useEffect(() => {
    if (onLoaded) onLoaded(totalRevenue);
  }, [totalRevenue, onLoaded]);

  const statsData: StatItem[] = [
    {
      title: "Total Revenue",
      icon: "receipt",
      value: totalRevenue,
      color: "teal",
      diff: 12,
      loading: isLoadingCashinData,
    },
  ];

  return <StatsGrid data={statsData} />;
};
