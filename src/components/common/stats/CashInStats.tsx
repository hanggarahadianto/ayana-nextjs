import { getAssetSummary } from "@/api/finance/getAssetSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type CashInStatsProps = {
  companyId?: string;
  assetType?: string;
  category?: string;
  onLoaded?: (val: number) => void; // <--- tambahkan ini
  title?: string;
};

export const CashinStats = ({ companyId, assetType, category, onLoaded, title }: CashInStatsProps) => {
  const { data: cashinData, isPending: isLoadingCashinData } = useQuery({
    queryKey: ["getCashinDataStats", companyId, assetType, category],
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

  const totalCashIn = cashinData?.data?.total_asset ?? 0;

  useEffect(() => {
    if (onLoaded) onLoaded(totalCashIn);
  }, [totalCashIn, onLoaded]);

  // console.log("cash in data", cashinData);

  // console.log("total cashin", totalCashIn);

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
