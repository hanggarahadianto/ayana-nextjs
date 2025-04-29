import { getAssetSummary } from "@/api/finance/getAssetSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type AssetStatsProps = {
  companyId?: string;
  onAssetChange: (totalAsset: number) => void;
};

export const FixedAssetStats = ({ companyId, onAssetChange }: AssetStatsProps) => {
  const { data: fixedAssetSummaryOnly, isPending: isLoadingFixedAsset } = useQuery({
    queryKey: ["getFixedAsset", companyId],
    queryFn: () =>
      getAssetSummary({
        companyId: companyId || "",
        page: 1,
        limit: 10,
        assetType: "fixed_asset",
        summaryOnly: true,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalAsset = fixedAssetSummaryOnly?.data.total_asset ?? 0;
  useEffect(() => {
    onAssetChange(totalAsset);
  }, [totalAsset, onAssetChange]);

  const statsData: StatItem[] = [
    {
      title: "Fixed Asset",
      icon: "home", // <-- pakai string "home" sesuai dengan key di icons
      value: totalAsset,
      color: "red",
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
      loading: isLoadingFixedAsset,
    },
  ];

  return <StatsGrid data={statsData} />;
};
