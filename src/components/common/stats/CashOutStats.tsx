import { getAssetSummary } from "@/api/finance/getAssetSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type CashInStatsProps = {
  companyId?: string;
  assetType?: string;
  category?: string;
  title?: string;
};

export const CashOutStats = ({ companyId, assetType, category, title }: CashInStatsProps) => {
  const { data: cashOutData, isPending: isLoadingCashOutData } = useQuery({
    queryKey: ["getCashinData", companyId, assetType, category],
    queryFn: () =>
      getAssetSummary({
        companyId: companyId!,
        assetType,
        summaryOnly: true,
        selectedCategory: "Kas & Bank",
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });
  const totalCashOut = cashOutData?.data?.total_asset ?? 0;

  const statsData: StatItem[] = [
    {
      title: title ?? "Uang Keluar",
      icon: "receipt",
      value: totalCashOut,
      color: "red",
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
      loading: isLoadingCashOutData,
    },
  ];

  return <StatsGrid data={statsData} />;
};
