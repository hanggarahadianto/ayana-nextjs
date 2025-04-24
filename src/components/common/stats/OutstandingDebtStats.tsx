import { getCashSummary } from "@/api/finance/getCashSummary";
import { getOutstandingDebt } from "@/api/finance/getOutstandingDebt";

import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type OutstandingDebtStatsProps = {
  companyId?: string;
  // onOutstandingDebtChange: (totalOutstandingDebt: number) => void;
  // summaryOnly?: boolean; // ✅ dibuat optional
};

export const OutstandingDebtStats = ({
  companyId,
}: // onOutstandingDebtChange,
// summaryOnly,
OutstandingDebtStatsProps) => {
  const { data: OutstandingDebtSummaryOnlyData, isPending: isLoadingSummary } = useQuery({
    queryKey: ["getOutstandingDebtOnlyData", companyId],
    queryFn: () =>
      getOutstandingDebt({
        companyId: companyId || "",
        page: 1,
        limit: 10,
        transactionStatus: "unpaid",
        // transactionType: "payin",
        summaryOnly: true,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalOutstandingDebt = OutstandingDebtSummaryOnlyData?.data?.total_outstandingDebt ?? 0;
  // useEffect(() => {
  //   onOutstandingDebtChange(totalOutstandingDebt);
  // }, [totalOutstandingDebt, onOutstandingDebtChange]);

  const statsData: StatItem[] = [
    {
      title: "Total Outstanding Debt",
      icon: "receipt",
      value: totalOutstandingDebt,
      color: "orange",
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
    },
  ];

  return <StatsGrid data={statsData} />;
};
