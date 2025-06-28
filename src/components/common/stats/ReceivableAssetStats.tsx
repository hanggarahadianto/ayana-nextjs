import { getAssetSummary } from "@/api/finance/getAssetSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";

type AssetStatsProps = {
  companyId?: string;
  title?: string;
};

export const ReceivableAssetStats = ({ companyId, title }: AssetStatsProps) => {
  const { data: receivableAssetSummaryOnly, isPending: isLoadingReceivableAsset } = useQuery({
    queryKey: ["getReceivableAsset", companyId],
    queryFn: () =>
      getAssetSummary({
        companyId: companyId || "",
        page: 1,
        limit: 10,
        assetType: "receivable",
        summaryOnly: true,
        debitCategory: null,
        creditCategory: null,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalAsset = receivableAssetSummaryOnly?.data.total_asset ?? 0;

  const statsData: StatItem[] = [
    {
      title: title ?? "Piutang",
      icon: "home", // <-- pakai string "home" sesuai dengan key di icons
      value: totalAsset,
      color: "violet",
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
      loading: isLoadingReceivableAsset,
    },
  ];

  return <StatsGrid data={statsData} />;
};
