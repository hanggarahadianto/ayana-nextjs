import { getEquitySummary } from "@/api/finance/getEquitySummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";

type EquityStatsProps = {
  companyId?: string;
  equityType?: string;
  title?: string;
};

export const EquityStats = ({ companyId, equityType, title }: EquityStatsProps) => {
  const { data: equityData, isPending: isLoadingEquityData } = useQuery({
    queryKey: ["getEquityDataStats", companyId, equityType],
    queryFn: () =>
      getEquitySummary({
        companyId: companyId!,
        summaryOnly: true,
        equityType,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalCashIn = equityData?.data?.total_equity ?? 0;
  const color = equityType === "setor" ? "green" : equityType === "tarik" ? "red" : "gray";

  const statsData: StatItem[] = [
    {
      title: title ?? "Modal",
      icon: "receipt",
      value: totalCashIn,
      color: color,
      diff: 12,
      loading: isLoadingEquityData,
    },
  ];

  return <StatsGrid data={statsData} />;
};
