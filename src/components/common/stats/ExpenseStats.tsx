import { getExpenseSummary } from "@/api/finance/getExpenseSummary";
import { StatItem, StatsGrid } from "@/components/common/stats/StatsGrid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type ExpenseStatsProps = {
  companyId?: string;
  onExpenseChange: (totalExpense: number) => void;
};

export const ExpenseStats = ({ companyId, onExpenseChange }: ExpenseStatsProps) => {
  const { data: expenseSummaryOnlyData, isPending: isLoadingExpense } = useQuery({
    queryKey: ["getExpenseOnlyData", companyId],
    queryFn: () =>
      getExpenseSummary({
        companyId: companyId || "",
        page: 1,
        limit: 10,
        summaryOnly: true,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalExpense = expenseSummaryOnlyData?.data?.total_expense ?? 0;
  useEffect(() => {
    onExpenseChange(totalExpense);
  }, [totalExpense, onExpenseChange]);

  const statsData: StatItem[] = [
    {
      title: "Total Expense",
      icon: "receipt",
      value: totalExpense,
      color: "red",
      diff: 12, // nanti bisa dihitung dari backend atau cache data lama
      loading: isLoadingExpense,
    },
  ];

  return <StatsGrid data={statsData} />;
};
