import { getAssetSummary } from "@/api/finance/getAssetSummary";
import { getAvailableCash } from "@/api/finance/getAvailableCash";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type CashInStatsProps = {
  companyId?: string;
};

export const CashOutStats = ({ companyId }: CashInStatsProps) => {
  const { data: cashOutData, isPending: isLoadingCashout } = useQuery({
    queryKey: ["getCashout", companyId],
    queryFn: () =>
      getAvailableCash({
        companyId: companyId || "",
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalCashOut = cashOutData?.data?.total_cash_out ?? 0;

  const statsData: StatItem[] = [
    {
      title: "Total Cash Out",
      icon: "receipt",
      value: totalCashOut,
      color: "red",
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
      loading: isLoadingCashout,
    },
  ];

  return <StatsGrid data={statsData} />;
};
