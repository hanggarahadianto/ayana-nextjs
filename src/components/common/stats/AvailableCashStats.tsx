import { getAssetSummary } from "@/api/finance/getAssetSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";

type AvailableCashStatsProps = {
  companyId?: string;
  title?: string;
};

export const AvailableCashStats = ({ companyId, title }: AvailableCashStatsProps) => {
  const { data: cashInData, isLoading: loadingIn } = useQuery({
    queryKey: ["getCashInStats", companyId],
    queryFn: () =>
      getAssetSummary({
        companyId: companyId!,
        assetType: "cashin",
        summaryOnly: true,
        debitCategory: "Kas & Bank",
        creditCategory: null,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const { data: cashOutData, isLoading: loadingOut } = useQuery({
    queryKey: ["getCashOutStats", companyId],
    queryFn: () =>
      getAssetSummary({
        companyId: companyId!,
        assetType: "cashout",
        summaryOnly: true,
        debitCategory: null,
        creditCategory: null,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalCashIn = cashInData?.data?.total_asset ?? 0;
  const totalCashOut = cashOutData?.data?.total_asset ?? 0;
  const availableCash = totalCashIn - Math.abs(totalCashOut);

  const statsData: StatItem[] = [
    {
      title: title ?? "Saldo Tersedia",
      icon: "receipt",
      value: availableCash,
      color: "blue",
      diff: 0, // Optional: bisa kamu hitung dari data sebelumnya
      loading: loadingIn || loadingOut,
    },
  ];

  return <StatsGrid data={statsData} />;
};
