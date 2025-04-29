import { getAvailableCash } from "@/api/finance/getAvailableCash";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type AvailableCashStatsProps = {
  companyId?: string;
  onCashInChange: (totalCashIn: number) => void;
};

export const AvailableCashStats = ({ companyId, onCashInChange }: AvailableCashStatsProps) => {
  const { data: availableCash, isPending: isLoadingAvailableCash } = useQuery({
    queryKey: ["getAvailableCash", companyId],
    queryFn: () =>
      getAvailableCash({
        companyId: companyId || "",
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalCashIn = availableCash?.data?.total_asset ?? 0;
  useEffect(() => {
    onCashInChange(totalCashIn);
  }, [totalCashIn, onCashInChange]);

  const statsData: StatItem[] = [
    {
      title: "Total Available Cash",
      icon: "receipt",
      value: totalCashIn,
      color: "white",
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
    },
  ];

  return <StatsGrid data={statsData} />;
};
