import { Card, Text, Group, Stack, Loader, Pagination, Select, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useEffect, useMemo, useState } from "react";
import ExpenseSummaryTable from "./ExpenseSummaryTable";
import { getExpenseSummary } from "@/api/finance/getExpenseSummary";
import LoadingGlobal from "@/styles/loading/loading-global";
import CreateJournalEntryModal from "../journalEntry/CreateJournalEntryModal";
import { formatCurrency } from "@/utils/formatCurrency";

interface ExpenseSummaryCardProps {
  companyId?: string;
  companyName?: string;
  // refetchOutstandingDebtData: () => void;
}

export const GetExpenseSummaryData = ({ companyId, companyName }: ExpenseSummaryCardProps) => {
  const [pageExpense, setPageExpense] = useState(1);
  const limit = 10;
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const status = "base";

  const {
    data: expenseSummaryData,
    isLoading: isLoadingExpenseSummaryData,
    refetch: refetchExpenseSummaryData,
  } = useQuery({
    queryKey: ["getExpenseSummaryData", companyId, pageExpense, limit, status],
    queryFn: () => (companyId ? getExpenseSummary({ companyId: companyId, page: pageExpense, limit, status }) : Promise.resolve(null)),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  // Debug selectedType
  useEffect(() => {
    console.log("selectedType updated:", selectedType);
  }, [selectedType]);

  const totalPages = useMemo(() => {
    return expenseSummaryData?.data.total ? Math.ceil(expenseSummaryData?.data.total / limit) : 1;
  }, [expenseSummaryData]);

  const startIndex = (pageExpense - 1) * limit + 1;
  const endIndex = Math.min(pageExpense * limit, expenseSummaryData?.data.total || 0);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingExpenseSummaryData} />
      {/* <Stack justify="flex-end" align="flex-end" p={40}>
        {companyId && <CreateJournalEntryModal companyId={companyId} transactionType="payout" />}
      </Stack> */}

      <Stack gap="md">
        <Group justify="space-between" align="space-between">
          <Text size="lg" fw={600}>
            Pengeluaran {companyName}
          </Text>
          <Group justify="space-between" p={20}>
            <Text fw={800} size="xl" c={"orange"}>
              {formatCurrency(expenseSummaryData?.data?.total_expense ?? 0)}
            </Text>
          </Group>
        </Group>

        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "50vh", // Pastikan container mengisi tinggi layar
            justifyContent: "space-between", // Paginasi akan tetap di bawah
          }}
        >
          {/* Bagian Tabel */}
          <Box style={{ flex: 1 }}>
            <ExpenseSummaryTable data={expenseSummaryData?.data.expenseList || []} startIndex={startIndex} />
          </Box>

          {totalPages > 0 && (
            <Stack gap="xs" mt="md" style={{ paddingBottom: "16px" }}>
              <Pagination total={totalPages} value={pageExpense} onChange={setPageExpense} />
              <Text size="sm" c="dimmed">
                Menampilkan {startIndex} sampai {endIndex} dari {expenseSummaryData?.data.total} data
              </Text>
            </Stack>
          )}
        </Box>
      </Stack>
    </Card>
  );
};
