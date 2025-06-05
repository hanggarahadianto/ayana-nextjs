import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Pagination, Box, Group, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { formatCurrency } from "@/helper/formatCurrency";
import { getExpenseSummary } from "@/api/finance/getExpenseSummary";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import { useModalStore } from "@/store/modalStore";
import UpdateJournalEntryModal from "../journalEntry/UpdateJournalEntryModal";
import SearchTable from "@/components/common/table/SearchTableComponent";
import { columnsBaseExpense } from "./ExpenseColumn";

interface GetExpenseDataProps {
  companyId: string;
  companyName?: string;
}
export const GetExpenseSummaryData = ({ companyId, companyName }: GetExpenseDataProps) => {
  const limit = 10;
  const [pageExpense, setPageExpense] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const status = "base";
  const {
    data: expenseData,
    isLoading: isLoadingExpense,
    refetch: refetchExpenseData,
  } = useQuery({
    queryKey: [
      "getExpenseSummaryData",
      companyId,
      pageExpense,
      limit,
      status,
      searchTerm,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
    ],
    queryFn: async () => {
      if (!companyId) return null;

      return await getExpenseSummary({
        companyId,
        page: pageExpense,
        status,
        limit,
        search: searchTerm,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    },
    enabled: Boolean(companyId),
    refetchOnWindowFocus: false,
  });

  const expenseList = expenseData?.data.expenseList ?? [];

  const totalPages = Math.ceil((expenseData?.data?.total ?? 0) / limit);

  const startIndex = (pageExpense - 1) * limit + 1;
  const endIndex = Math.min(pageExpense * limit, expenseData?.data.total || 0);

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteExpense } = useDeleteDataJournalEntry();
  const handleDeleteDataJournal = (idToDelete: string) => {
    console.log("idToDelete", idToDelete);
    mutateDeleteDataJournal(idToDelete);
  };

  const openEditModal = (expenseData: IExpenseSummaryItem) => {
    useModalStore.getState().openModal("editExpenseData", expenseData);
  };

  const columns = columnsBaseExpense(openEditModal, handleDeleteDataJournal);

  return (
    <SimpleGridGlobal cols={1}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <LoadingGlobal visible={isLoadingExpense || isLoadingDeleteExpense} />
        <Group justify="space-between">
          <Stack>
            <Text size="xl" fw={600}>
              Pengeluaran {companyName}
            </Text>
          </Stack>
          <Text size="xl" fw={800} c={"red"} mt={20}>
            -{formatCurrency(expenseData?.data.total_expense ?? 0)}
          </Text>
        </Group>
        <SearchTable
          companyId={companyId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          readonly
        />

        <Box style={{ flex: 1 }}>
          <TableComponent
            startIndex={startIndex}
            data={expenseList}
            totalAmount={expenseData?.data?.total_expense ?? 0}
            height={"580"}
            columns={columns}
          />
        </Box>

        <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType="payout" />

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
