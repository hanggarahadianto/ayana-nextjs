import { getOutstandingDebt } from "@/api/finance/getOutstandingDebt";
import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Stack, Group, Box, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { formatCurrency } from "@/helper/formatCurrency";
import TableComponent from "@/components/common/table/TableComponent";
import ReversedJournalEntryModal from "../journalEntry/ReversedJournalEntryModal";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import { useModalStore } from "@/store/modalStore";
import SearchTable from "@/components/common/table/SearchTableComponent";
import { columnsBaseDebt } from "./OutstandingDebtColumn";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import { useDebounce } from "use-debounce";
import { formatDateRange } from "@/helper/formatDateIndonesia";

interface GetOutStandingDebtDataProps {
  companyId: string;
  companyName?: string;
  title: string;
  debtType: string;
  transactionType: string;
}

export const GetOutstandingDebtData = ({ companyId, companyName, title, debtType, transactionType }: GetOutStandingDebtDataProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebounce(searchTerm, 500); // delay 500ms

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);
  const [selectedDebt, setSelectedDebt] = useState<IDebtSummaryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "repayment_date";

  const {
    data: outstandingDebtData,
    isLoading: isLoadingOutstandingDebt,
    refetch: isRefetchOutstandingDebtData,
    isFetching: isFetchingOutstandingDebtData, // untuk setiap refetch
  } = useQuery({
    queryKey: [
      "getOutstandingDebtByCompanyId",
      companyId,
      selectedCategory,
      page,
      limit,
      debtType,
      debouncedSearch,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
    ],
    queryFn: () =>
      companyId
        ? getOutstandingDebt({
            companyId,
            selectedCategory: selectedCategory ?? undefined,
            page,
            limit,
            debtType,
            search: debouncedSearch,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          })
        : null,
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const debtList = outstandingDebtData?.data.debtList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, outstandingDebtData?.data.total || 0);

  const handleSendClick = (debt: IDebtSummaryItem) => {
    setSelectedDebt(debt);
    setIsModalOpen(true);
  };

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteDebt } = useDeleteDataJournalEntry();
  const handleDeleteDataJournal = (idToDelete: string) => {
    mutateDeleteDataJournal([idToDelete]); // <-- bungkus dalam array
  };

  const openEditModal = (outstandingDebtData: IDebtSummaryItem) => {
    useModalStore.getState().openModal("editOutstadingData", outstandingDebtData);
  };

  const columns = columnsBaseDebt(handleSendClick, openEditModal, handleDeleteDataJournal, status);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            {title} {""} {companyName}
          </Text>
        </Stack>
        <Text size="xl" fw={800} c={"red"} mt={20}>
          {formatCurrency(outstandingDebtData?.data.total_debt ?? 0)}
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
        transactionType={null}
        debitAccountType={null}
        creditAccountType={"Liability"}
        readonly={false}
        useCategory={true}
        onRefresh={isRefetchOutstandingDebtData}
        isFetching={isFetchingOutstandingDebtData}
      />

      <Box style={{ position: "relative" }}>
        {isLoadingOutstandingDebt ? (
          <Skeleton height={limit * 60} />
        ) : (
          <TableComponent
            startIndex={startIndex}
            data={debtList}
            totalAmount={outstandingDebtData?.data.total_debt}
            transactionType={transactionType}
            height={"580"}
            columns={columns}
          />
        )}

        <LoadingGlobal visible={isLoadingOutstandingDebt || isLoadingDeleteDebt} />
      </Box>

      {!isLoadingOutstandingDebt && (
        <PaginationWithLimit
          total={outstandingDebtData?.data.total ?? 0}
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

      {selectedDebt && companyId && (
        <ReversedJournalEntryModal
          companyId={companyId}
          transactionType="payout"
          initialData={selectedDebt}
          opened={isModalOpen}
          close={() => setIsModalOpen(false)}
        />
      )}
    </Card>
  );
};
