import { getAssetSummary } from "@/api/finance/getAssetSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";

type CashInStatsProps = {
  companyId?: string;
  assetType?: string;
  category?: string;
  title?: string;
};

export const CashinStats = ({ companyId, assetType, category, title }: CashInStatsProps) => {
  const { data: cashinData, isPending: isLoadingCashinData } = useQuery({
    queryKey: ["getCashinData", companyId, assetType, category],
    queryFn: () =>
      getAssetSummary({
        companyId: companyId!,
        assetType,
        summaryOnly: true,
        debitCategory: category ?? "",
        creditCategory: null,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  console.log("cash in data", cashinData);

  const totalCashIn = cashinData?.data?.total_asset ?? 0;
  console.log("total cashin", totalCashIn);

  const statsData: StatItem[] = [
    {
      title: title ?? "Uang Masuk",
      icon: "receipt",
      value: totalCashIn,
      color: "green",
      diff: 12,
      loading: isLoadingCashinData,
    },
  ];

  return <StatsGrid data={statsData} />;
};
