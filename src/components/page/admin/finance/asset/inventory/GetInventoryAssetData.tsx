import { Card, Text, Group, Stack } from "@mantine/core";
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
import SearchTable from "@/components/common/table/SearchTableComponent";
import { columnsBaseInventoryAsset } from "./InventoryColumn";
import PaginationWithLimit from "@/components/common/pagination/PaginationWithLimit";
import { useDebounce } from "use-debounce";

interface AssetSummaryCardProps {
  companyId: string;
  companyName?: string;
  assetType?: string;
  transactionType: string;
  title: string;
}

export const GetInventoryAssetData = ({ companyId, companyName, assetType, transactionType, title }: AssetSummaryCardProps) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Barang Dagangan");

  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebounce(searchTerm, 500); // delay 500ms

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const sortBy = "inputed_date"; // bisa juga dari Select nanti
  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const {
    data: inventoryAssetSummaryData,
    isPending: isLoadingAssetData,
    refetch: isRefetchInventoryAsset,
    isFetching: isFetchingInventoryAsset, // untuk setiap refetch
  } = useQuery({
    queryKey: [
      "getInventoryAssetData",
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
        debitCategory: null,
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

  const assetList = inventoryAssetSummaryData?.data?.assetList ?? [];
  const totalData = inventoryAssetSummaryData?.data?.total ?? 0;
  const totalAssetIn = inventoryAssetSummaryData?.data?.total_asset ?? 0;
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, totalData);

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteFixAsset } = useDeleteDataJournalEntry(title);

  const openEditModal = (inventoryAssetSummaryData: IAssetSummaryItem) => {
    useModalStore.getState().openModal("editInventoryAssetData", inventoryAssetSummaryData);
  };

  const deleteJournalWithIdsOnly = (ids: string[]) => {
    mutateDeleteDataJournal({ ids });
  };

  const columns = columnsBaseInventoryAsset(deleteJournalWithIdsOnly, openEditModal, isLoadingDeleteFixAsset);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingAssetData} />
      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            {title} {companyName}
          </Text>
        </Stack>
        <Text size="xl" fw={800} c={"teal"} mt={20}>
          {formatCurrency(inventoryAssetSummaryData?.data.total_asset ?? 0)}
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
        readonly={true}
        transactionType={transactionType}
        debitAccountType={null}
        creditAccountType={"Asset"}
        useCategory={true}
        onRefresh={isRefetchInventoryAsset}
        isFetching={isFetchingInventoryAsset}
      />
      <TableComponent
        startIndex={startIndex}
        data={assetList}
        totalAmount={totalAssetIn}
        transactionType={transactionType}
        height={"580"}
        columns={columns}
      />

      <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType="payin" />

      <PaginationWithLimit
        total={inventoryAssetSummaryData?.data.total ?? 0}
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
    </Card>
  );
};
