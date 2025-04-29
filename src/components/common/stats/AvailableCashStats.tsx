import { getAvailableCash } from "@/api/finance/getAvailableCash";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type AvailableCashStatsProps = {
  companyId?: string;
};

export const AvailableCashStats = ({ companyId }: AvailableCashStatsProps) => {
  const { data: availableCash, isPending: isLoadingAvailableCash } = useQuery({
    queryKey: ["getAvailableCash", companyId],
    queryFn: () =>
      getAvailableCash({
        companyId: companyId || "",
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalCashIn = availableCash?.data?.available_cash ?? 0;

  const statsData: StatItem[] = [
    {
      title: "Total Available Cash",
      icon: "receipt",
      value: totalCashIn,
      color: "white",
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
      loading: isLoadingAvailableCash,
    },
  ];

  return <StatsGrid data={statsData} />;
};
