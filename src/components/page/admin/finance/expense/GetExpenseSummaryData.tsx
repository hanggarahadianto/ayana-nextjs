import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Box, Group, Skeleton } from "@mantine/core";
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
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebounce(searchTerm, 500); // delay 500ms

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "date_inputed"; // bisa juga dari Select nanti

  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const expenseType = "base";
  const transactionType = "payout";

  const {
    data: expenseData,
    isLoading: isLoadingExpense,
    refetch: isRefetchExpenseData,
    isFetched: isFetchingExpenseData, // untuk setiap refetch
  } = useQuery({
    queryKey: [
      "getExpenseSummaryData",
      companyId,
      selectedCategory,
      page,
      limit,
      expenseType,
      debouncedSearch,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      companyId
        ? getExpenseSummary({
            companyId,
            debitCategory: selectedCategory,
            creditCategory: null,
            page,
            limit,
            expenseType,
            search: debouncedSearch,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            sortBy,
            sortOrder,
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
        <Group justify="space-between">
          <Stack>
            <Text size="xl" fw={600}>
              {title} {""} {companyName}
            </Text>
          </Stack>
          <Text size="xl" fw={800} c={"red"} mt={20}>
            {formatCurrency(expenseData?.data.total_expense ?? 0)}
          </Text>
        </Group>
        <SearchTable
          label={"Cari Data Transaksi"}
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
          onRefresh={isRefetchExpenseData}
          isFetching={isFetchingExpenseData}
        />

        <Box style={{ position: "relative" }}>
          {isLoadingExpense ? (
            <Skeleton height={limit * 60} />
          ) : (
            <TableComponent
              startIndex={startIndex}
              data={expenseList}
              totalAmount={expenseData?.data?.total_expense ?? 0}
              height={"580"}
              columns={columns}
            />
          )}

          <LoadingGlobal visible={isLoadingExpense || isLoadingDeleteExpense} />
        </Box>
        <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType="payout" />

        <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType="payout" />

        {!isLoadingExpense && (
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
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />
        )}
      </Card>
    </SimpleGridGlobal>
  );
};
