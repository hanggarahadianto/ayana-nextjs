import { getAssetSummary } from "@/api/finance/getAssetSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type CashInStatsProps = {
  companyId?: string;
  onCashInChange: (totalCashIn: number) => void;
};

export const CashinStats = ({ companyId, onCashInChange }: CashInStatsProps) => {
  const { data: cashinSummaryOnly, isPending: isLoadingSummary } = useQuery({
    queryKey: ["getCashinAsset", companyId],
    queryFn: () =>
      getAssetSummary({
        companyId: companyId || "",
        page: 1,
        limit: 10,
        assetType: "cashin",
        summaryOnly: true,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalCashIn = cashinSummaryOnly?.data?.total_asset ?? 0;
  useEffect(() => {
    onCashInChange(totalCashIn);
  }, [totalCashIn, onCashInChange]);

  const statsData: StatItem[] = [
    {
      title: "Total Cash In",
      icon: "receipt",
      value: totalCashIn,
      color: "green",
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
    },
  ];

  return <StatsGrid data={statsData} />;
};
