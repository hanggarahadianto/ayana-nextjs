import { getAssetSummary } from "@/api/finance/getAssetSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type AssetStatsProps = {
  companyId?: string;
  onAssetChange: (totalAsset: number) => void;
};

export const ReceivableAssetStats = ({ companyId, onAssetChange }: AssetStatsProps) => {
  const { data: receivableAssetSummaryOnly, isPending: isLoadingReceivableAsset } = useQuery({
    queryKey: ["getReceivableAsset", companyId],
    queryFn: () =>
      getAssetSummary({
        companyId: companyId || "",
        page: 1,
        limit: 10,
        assetType: "receivable",
        summaryOnly: true,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalAsset = receivableAssetSummaryOnly?.data.total_asset ?? 0;
  useEffect(() => {
    onAssetChange(totalAsset);
  }, [totalAsset, onAssetChange]);

  const statsData: StatItem[] = [
    {
      title: "Receivable Asset",
      icon: "home", // <-- pakai string "home" sesuai dengan key di icons
      value: totalAsset,
      color: "violet",
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
      loading: isLoadingReceivableAsset,
    },
  ];

  return <StatsGrid data={statsData} />;
};
