import { getCashSummary } from "@/api/finance/getCashSummary";
import { getAssetSummary } from "@/api/finance/getAssetSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type AssetStatsProps = {
  companyId?: string;
  onAssetChange: (totalAsset: number) => void;
};

export const AssetStats = ({ companyId, onAssetChange }: AssetStatsProps) => {
  const { data: AssetSummaryOnlyData, isPending: isLoadingSummary } = useQuery({
    queryKey: ["getAssetOnlyData", companyId],
    queryFn: () =>
      getAssetSummary({
        companyId: companyId || "",
        page: 1,
        limit: 10,
        transactionType: "",
        summaryOnly: true,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalAsset = AssetSummaryOnlyData?.data?.total_asset ?? 0;
  useEffect(() => {
    onAssetChange(totalAsset);
  }, [totalAsset, onAssetChange]);

  const statsData: StatItem[] = [
    {
      title: "Total Asset",
      icon: "receipt",
      value: totalAsset,
      color: "red",
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
    },
  ];

  return <StatsGrid data={statsData} />;
};
