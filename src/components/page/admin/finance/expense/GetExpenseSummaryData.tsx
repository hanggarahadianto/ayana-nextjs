import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Pagination, Select, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { getExpenseSummary } from "@/api/finance/getExpenseSummary";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";

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
    data: expenseData,
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

  const expenseList = expenseData?.data.expenseList ?? [];

  const totalPages = useMemo(() => {
    return expenseData?.data?.total ? Math.ceil(expenseData.data.total / limit) : 1;
  }, [expenseData]);

  const startIndex = (pageExpense - 1) * limit + 1;
  const endIndex = Math.min(pageExpense * limit, expenseData?.data.total || 0);

  return (
    <SimpleGridGlobal cols={1}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <LoadingGlobal visible={isLoadingExpense} />

        <Box style={{ flex: 1 }}>
          <TableComponent
            companyName={companyName}
            startIndex={startIndex}
            data={expenseList}
            totalAmount={expenseData?.data?.total_expense ?? 0}
            title={"Pengeluaran"}
            columns={[
              { key: "invoice", title: "Invoice", width: 100, minWidth: 100 },
              { key: "transaction_id", title: "Transaction ID", width: 40, minWidth: 40 },
              { key: "partner", title: "Partner", width: 120, minWidth: 120 },

              {
                key: "amount",
                title: "Nominal",
                width: 120,
                minWidth: 120,
                render: (item) => formatCurrency(item.amount),
              },
              {
                key: "date_inputed",
                title: "Tanggal Transaksi",
                width: 120,
                minWidth: 120,
                render: (item) => formatDateIndonesia(item.date_inputed),
              },

              { key: "description", title: "Deskripsi", width: 260, minWidth: 260 },
            ]}
          />
        </Box>

        {/* Bagian Paginasi */}
        {totalPages > 0 && (
          <Stack gap="xs" style={{ paddingBottom: "16px" }}>
            <Pagination total={totalPages} value={pageExpense} onChange={setPageExpense} />
            <Text size="sm" c="dimmed">
              Menampilkan {startIndex} sampai {endIndex} dari {expenseData?.data.total} data
            </Text>
          </Stack>
        )}
      </Card>
    </SimpleGridGlobal>
  );
};
