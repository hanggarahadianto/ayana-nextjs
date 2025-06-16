import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Box, Group } from "@mantine/core";
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
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import { useDebounce } from "use-debounce";

interface GetExpenseDataProps {
  companyId: string;
  companyName?: string;
  title: string;
}
export const GetExpenseSummaryData = ({ companyId, companyName, title }: GetExpenseDataProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500); // delay 500ms

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const status = "base";
  const transactionType = "payout";

  const {
    data: expenseData,
    isLoading: isLoadingExpense,
    refetch: refetchExpenseData,
  } = useQuery({
    queryKey: [
      "getExpenseSummaryData",
      companyId,
      selectedCategory,
      page,
      limit,
      status,
      debouncedSearch,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
    ],
    queryFn: () =>
      companyId
        ? getExpenseSummary({
            companyId,
            selectedCategory: selectedCategory ?? undefined,
            page,
            limit,
            status,
            search: debouncedSearch,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          })
        : null,
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const expenseList = expenseData?.data.expenseList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, expenseData?.data.total || 0);

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteExpense } = useDeleteDataJournalEntry();
  const handleDeleteDataJournal = (idToDelete: string) => {
    mutateDeleteDataJournal([idToDelete]); // <-- bungkus dalam array
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
              {title}
              {""}
              {companyName}
            </Text>
          </Stack>
          <Text size="xl" fw={800} c={"red"} mt={20}>
            {formatCurrency(expenseData?.data.total_expense ?? 0)}
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
          transactionType={transactionType}
          debitAccountType={"Expense"}
          creditAccountType={""}
          readonly={false}
          useCategory={true}
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

        <PaginationWithLimit
          total={expenseData?.data.total ?? 0}
          page={page}
          limit={limit}
          startIndex={startIndex}
          endIndex={endIndex}
          onPageChange={setPage}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      </Card>
    </SimpleGridGlobal>
  );
};
