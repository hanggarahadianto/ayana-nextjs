import { getOutstandingDebt } from "@/api/finance/getOutstandingDebt";

import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";

type OutstandingDebtStatsProps = {
  companyId?: string;
  title?: string;
};

export const OutstandingDebtStats = ({ companyId, title }: OutstandingDebtStatsProps) => {
  const { data: OutstandingDebtSummaryOnlyData, isPending: isLoadingDebt } = useQuery({
    queryKey: ["getOutstandingDebtOnlyData", companyId],
    queryFn: () =>
      getOutstandingDebt({
        companyId: companyId || "",
        page: 1,
        limit: 10,
        status: "going",
        summaryOnly: true,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalOutstandingDebt = OutstandingDebtSummaryOnlyData?.data?.total_debt ?? 0;

  const statsData: StatItem[] = [
    {
      title: title ?? "Hutang",
      icon: "receipt",
      value: totalOutstandingDebt,
      color: "orange",
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
      loading: isLoadingDebt,
    },
  ];

  return <StatsGrid data={statsData} />;
};
