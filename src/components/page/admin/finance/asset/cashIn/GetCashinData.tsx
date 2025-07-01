import { Card, Text, Group, Stack, Box, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/helper/formatCurrency";
import CreateJournalEntryModal from "../../journalEntry/CreateJournalEntryModal";
import { getAssetSummary } from "@/api/finance/getAssetSummary";
import TableComponent from "@/components/common/table/TableComponent";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import { useModalStore } from "@/store/modalStore";
import UpdateJournalEntryModal from "../../journalEntry/UpdateJournalEntryModal";
import SearchTable from "@/components/common/table/SearchTableComponent";
import { columnsBaseCashIn } from "./CashInColumn";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import { useDebounce } from "use-debounce";
import { formatDateRange } from "@/helper/formatDateIndonesia";

interface CashSummaryCardProps {
  companyId: string;
  companyName?: string;
  assetType?: string;
  transactionType: string;
  title: string;
}

export const GetCashinData = ({ companyId, companyName, assetType, transactionType, title }: CashSummaryCardProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Kas & Bank");
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebounce(searchTerm, 500); // delay 500ms
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "inputed_date";
  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const {
    data: cashinSummaryData,
    isPending: isLoadingCashinData,
    refetch: isRefetchCashinData,
    isFetched: isFetchingCashinData, // untuk setiap refetch
  } = useQuery({
    queryKey: [
      "getCashinData",
      companyId,
      page,
      limit,
      assetType,
      selectedCategory,
      debouncedSearch,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      getAssetSummary({
        companyId,
        page,
        limit,
        assetType,
        debitCategory: selectedCategory,
        creditCategory: null,
        search: debouncedSearch,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        sortBy,
        sortOrder,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });
  const cashInList = cashinSummaryData?.data.assetList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, cashinSummaryData?.data.total || 0);

  const openEditModal = (cashInAsset: IAssetSummaryItem) => {
    useModalStore.getState().openModal("editCashInData", cashInAsset);
  };

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteCashIn } = useDeleteDataJournalEntry();
  const handleDeleteDataJournal = (idToDelete: string) => {
    mutateDeleteDataJournal([idToDelete]);
  };

  const columns = columnsBaseCashIn(openEditModal, handleDeleteDataJournal);

  return (
    <Card padding="lg" shadow="sm" radius="md" withBorder>
      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            {title} {companyName}
          </Text>
        </Stack>
        <Stack align="flex-end">
          <CreateJournalEntryModal companyId={companyId} transactionType={"payin"} />
          <Text size="xl" fw={800} c={"teal"} mt={20}>
            {formatCurrency(cashinSummaryData?.data.total_asset ?? 0)}
          </Text>
        </Stack>
      </Group>
      <Stack mb={12}>
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
          readonly={true}
          transactionType={null}
          debitAccountType={"Asset"}
          creditAccountType={null}
          useCategory={true}
          onRefresh={isRefetchCashinData}
          isFetching={isFetchingCashinData}
        />
      </Stack>

      <Box style={{ position: "relative" }}>
        {isLoadingCashinData ? (
          <Skeleton height={limit * 60} />
        ) : (
          <TableComponent
            startIndex={startIndex}
            data={cashInList}
            totalAmount={cashinSummaryData?.data.total_asset}
            transactionType={transactionType}
            height={"580"}
            columns={columns}
          />
        )}

        <LoadingGlobal visible={isLoadingCashinData || isLoadingDeleteCashIn} />
      </Box>

      <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType="payin" />

      {!isLoadingCashinData && (
        <PaginationWithLimit
          total={cashinSummaryData?.data.total ?? 0}
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
  );
};
