import { getCashSummary } from "@/api/finance/getCashSummary";
import { getExpenseSummary } from "@/api/finance/getExpenseSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";

type ExpenseStatsProps = {
  companyId?: string;
};

export const ExpenseStats = ({ companyId }: ExpenseStatsProps) => {
  const { data: expenseSummaryOnlyData, isPending: isLoadingSummary } = useQuery({
    queryKey: ["getExpenseOnlyData", companyId],
    queryFn: () =>
      getExpenseSummary({
        companyId: companyId || "",
        page: 1,
        limit: 10,
        transactionType: "",
        summaryOnly: true,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  console.log("expenseSummaryOnlyData", expenseSummaryOnlyData);

  const totalExpense = expenseSummaryOnlyData?.data?.total_expense ?? 0;

  console.log("totalExpense", totalExpense);

  const statsData: StatItem[] = [
    {
      title: "Total Expense",
      icon: "receipt",
      value: totalExpense,
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
    },
  ];

  return <StatsGrid data={statsData} />;
};
