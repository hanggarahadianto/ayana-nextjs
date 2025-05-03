import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Group, Stack, Loader, Pagination, Select, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useEffect, useMemo, useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { getExpenseSummary } from "@/api/finance/getExpenseSummary";
import { ExpenseSummaryTable } from "./ExpenseSummaryTable";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";

interface GetExpenseDataProps {
  companyId?: string;
  companyName?: string;
}

export const GetExpenseSummaryData = ({ companyId, companyName }: GetExpenseDataProps) => {
  const limit = 10;
  const [pageExpense, setPageExpense] = useState(1);

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const status = "base";

  const {
    data: ExpenseData,
    isLoading: isLoadingExpense,
    refetch: refetchExpenseData,
  } = useQuery({
    queryKey: ["getExpenseSummaryData", companyId, pageExpense, limit, status],
    queryFn: async () => {
      if (!companyId) return null;

      return await getExpenseSummary({
        companyId,
        page: pageExpense,
        status,
        limit,
      });
    },
    enabled: Boolean(companyId),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log("selectedType updated:", selectedType);
  }, [selectedType]);

  const totalPages = useMemo(() => {
    return ExpenseData?.data?.total ? Math.ceil(ExpenseData.data.total / limit) : 1;
  }, [ExpenseData]);

  const startIndex = (pageExpense - 1) * limit + 1;
  const endIndex = Math.min(pageExpense * limit, ExpenseData?.data.total || 0);

  return (
    <SimpleGridGlobal cols={1}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <LoadingGlobal visible={isLoadingExpense} />

        <Stack gap="md">
          <Group justify="space-between" align="flex-start">
            <Stack gap="xs">
              <Text size="lg" fw={600}>
                Pengeluaran {companyName}
              </Text>
              <Select
                label="Filter berdasarkan Type"
                placeholder="Pilih Type"
                value={selectedType}
                onChange={(value) => {
                  setSelectedType(value);
                }}
                clearable
                style={{ width: 250 }}
              />
            </Stack>
          </Group>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "50vh",
              justifyContent: "space-between",
            }}
          >
            <Group justify="space-between" p={20}>
              <Text fw={600} mb="xs" mt={20}>
                Expense
              </Text>
              <Text fw={800} size="xl" c={"red"}>
                {formatCurrency(ExpenseData?.data?.total_expense ?? 0)}
              </Text>
            </Group>
            <Box style={{ flex: 1 }}>
              <Box style={{ flex: 1 }}>
                <ExpenseSummaryTable data={ExpenseData?.data.expenseList || []} startIndex={startIndex} />
              </Box>
            </Box>

            {/* Bagian Paginasi */}
            {totalPages > 0 && (
              <Stack gap="xs" style={{ paddingBottom: "16px" }}>
                <Pagination total={totalPages} value={pageExpense} onChange={setPageExpense} />
                <Text size="sm" c="dimmed">
                  Menampilkan {startIndex} sampai {endIndex} dari {ExpenseData?.data.total} data
                </Text>
              </Stack>
            )}
          </Box>
        </Stack>
      </Card>
    </SimpleGridGlobal>
  );
};
