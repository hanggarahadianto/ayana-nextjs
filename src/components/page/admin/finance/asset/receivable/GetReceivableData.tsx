import { Card, Text, Group, Stack, Box } from "@mantine/core";
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500); // delay 500ms
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);
  const [selectedReceivableAsset, setSelectedReceivableAsset] = useState<IAssetSummaryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: receivableAssetSummaryData, isPending: isLoadingReceivableAsset } = useQuery({
    queryKey: [
      "getReceivableAssetData",
      companyId,
      page,
      assetType,
      selectedCategory,
      debouncedSearch,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
    ],
    queryFn: () =>
      getAssetSummary({
        companyId,
        page,
        limit,
        assetType,
        category: "Piutang", // Hardcoded for Receivable Asset
        search: debouncedSearch, // 🔍
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const assetList = receivableAssetSummaryData?.data?.assetList ?? [];
  const totalData = receivableAssetSummaryData?.data?.total ?? 0;
  const totalPages = Math.ceil(totalData / limit);
  const totalAssetIn = receivableAssetSummaryData?.data?.total_asset ?? 0;

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, totalAssetIn);

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteRecivableAsset } = useDeleteDataJournalEntry();
  const handleDeleteDataJournal = (idToDelete: string) => {
    console.log("idToDelete", idToDelete);
    mutateDeleteDataJournal(idToDelete);
  };

  const openEditModal = (receivableAssetSummaryData: IAssetSummaryItem) => {
    useModalStore.getState().openModal("editReceivableAssetData", receivableAssetSummaryData);
  };

  const handleSendClick = (receivableAsset: IAssetSummaryItem) => {
    setSelectedReceivableAsset(receivableAsset);
    setIsModalOpen(true);
  };

  const columns = columnsBaseReceivableAsset(assetList, {
    handleSendClick,
    openEditModal,
    handleDeleteDataJournal,
  });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingReceivableAsset || isLoadingDeleteRecivableAsset} />
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
        companyId={companyId}
        category="Piutang"
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
          data={assetList}
          totalAmount={totalAssetIn}
          transactionType={transactionType}
          height={"580"}
          columns={columns}
        />
      </Box>
      <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType={transactionType} />

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
      />
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
