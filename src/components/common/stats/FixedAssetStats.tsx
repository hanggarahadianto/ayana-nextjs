import { getAssetSummary } from "@/api/finance/getAssetSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type AssetStatsProps = {
  companyId?: string;
  title?: string;
};

export const FixedAssetStats = ({ companyId, title }: AssetStatsProps) => {
  const { data: fixedAssetSummaryOnly, isPending: isLoadingFixedAsset } = useQuery({
    queryKey: ["getFixedAssetStats", companyId],
    queryFn: () =>
      getAssetSummary({
        companyId: companyId || "",
        assetType: "fixed_asset",
        summaryOnly: true,
        debitCategory: null,
        creditCategory: null,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalAsset = fixedAssetSummaryOnly?.data.total_asset ?? 0;

  const statsData: StatItem[] = [
    {
      title: title ?? "Aset Tetap",
      icon: "home", // <-- pakai string "home" sesuai dengan key di icons
      value: totalAsset,
      color: "blue",
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
      loading: isLoadingFixedAsset,
    },
  ];

  return <StatsGrid data={statsData} />;
};
