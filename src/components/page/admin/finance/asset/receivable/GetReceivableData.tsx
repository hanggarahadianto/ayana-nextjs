import { Card, Text, Group, Stack, Box, Skeleton } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/helper/formatCurrency";
import { getAssetSummary } from "@/api/finance/getAssetSummary";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateRange } from "@/helper/formatDateIndonesia";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import { useModalStore } from "@/store/modalStore";
import UpdateJournalEntryModal from "../../journalEntry/UpdateJournalEntryModal";
import ReversedJournalEntryModal from "../../journalEntry/ReversedJournalEntryModal";
import SearchTable from "@/components/common/table/SearchTableComponent";
import { columnsBaseReceivableAsset } from "./ReceivableAssetColumn";
import { useDebounce } from "use-debounce";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";

interface AssetSummaryCardProps {
  companyId: string;
  companyName?: string;
  assetType?: string;
  transactionType: "payout" | "payin";
  title: string;
}

export const GetReceivableAssetData = ({ companyId, companyName, assetType, transactionType, title }: AssetSummaryCardProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("");
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebounce(searchTerm, 500); // delay 500ms
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "due_date"; // bisa juga dari Select nanti

  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);
  const [selectedReceivableAsset, setSelectedReceivableAsset] = useState<IAssetSummaryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: receivableAssetSummaryData,
    isPending: isLoadingReceivableAsset,
    refetch: isRefetchReceivableAsset,
    isFetching: isFetchingReceivableAsset,
  } = useQuery({
    queryKey: [
      "getReceivableAssetData",
      companyId,
      page,
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
        search: debouncedSearch, // 🔍
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        sortBy,
        sortOrder,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const receivableList = receivableAssetSummaryData?.data?.assetList ?? [];
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, receivableAssetSummaryData?.data.total || 0);

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteReceivableAsset } = useDeleteDataJournalEntry();
  const handleDeleteDataJournal = (idToDelete: string) => {
    mutateDeleteDataJournal([idToDelete]); // <-- bungkus dalam array
  };

  const openEditModal = (receivableAssetSummaryData: IAssetSummaryItem) => {
    useModalStore.getState().openModal("editReceivableAssetData", receivableAssetSummaryData);
  };

  const handleSendClick = (receivableAsset: IAssetSummaryItem) => {
    setSelectedReceivableAsset(receivableAsset);
    setIsModalOpen(true);
  };

  const columns = columnsBaseReceivableAsset(receivableList, {
    handleSendClick,
    openEditModal,
    handleDeleteDataJournal,
  });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            {title} {companyName}
          </Text>
        </Stack>
        <Text size="xl" fw={800} c={"teal"} mt={20}>
          {formatCurrency(receivableAssetSummaryData?.data.total_asset ?? 0)}
        </Text>
      </Group>
      <SearchTable
        label={"Cari Data Transaksi"}
        companyId={companyId}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={"Piutang"}
        setSelectedCategory={setSelectedCategory}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        readonly={false}
        transactionType={null}
        debitAccountType={"Asset"}
        creditAccountType={null}
        useCategory={true}
        onRefresh={isRefetchReceivableAsset}
        isFetching={isFetchingReceivableAsset}
      />

      <Box style={{ position: "relative" }}>
        {isLoadingReceivableAsset ? (
          <Skeleton height={limit * 60} />
        ) : (
          <TableComponent
            startIndex={startIndex}
            data={receivableList}
            totalAmount={receivableAssetSummaryData?.data.total_asset}
            transactionType={transactionType}
            height={"580"}
            columns={columns}
          />
        )}

        <LoadingGlobal visible={isLoadingReceivableAsset || isLoadingDeleteReceivableAsset} />
      </Box>
      <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType={transactionType} />

      {!isLoadingReceivableAsset && (
        <PaginationWithLimit
          total={receivableAssetSummaryData?.data.total ?? 0}
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

      {selectedReceivableAsset && companyId && (
        <ReversedJournalEntryModal
          companyId={companyId}
          transactionType={transactionType}
          initialData={selectedReceivableAsset}
          opened={isModalOpen}
          close={() => setIsModalOpen(false)}
        />
      )}
    </Card>
  );
};
