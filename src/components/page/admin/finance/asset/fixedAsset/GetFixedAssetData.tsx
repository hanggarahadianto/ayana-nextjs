import { Card, Text, Group, Stack, Pagination, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/helper/formatCurrency";
import { getAssetSummary } from "@/api/finance/getAssetSummary";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateIndonesia, formatDateRange } from "@/helper/formatDateIndonesia";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import { IconPencil } from "@tabler/icons-react";
import { useModalStore } from "@/store/modalStore";
import UpdateJournalEntryModal from "../../journalEntry/UpdateJournalEntryModal";
import SearchTable from "@/components/common/table/SearchTableComponent";
import { columnsBaseFixAsset } from "./FixAssetColumn";

interface AssetSummaryCardProps {
  companyId: string;
  companyName?: string;
  assetType?: string;
  transactionType: string;
}

export const GetFixedAssetData = ({ companyId, companyName, assetType, transactionType }: AssetSummaryCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { formattedStartDate, formattedEndDate } = formatDateRange(startDate ?? undefined, endDate ?? undefined);

  const { data: fixAssetSummaryData, isPending: isLoadingAssetData } = useQuery({
    queryKey: [
      "getFixedAssetData",
      companyId,
      page,
      assetType,
      selectedCategory,
      searchTerm,
      formattedStartDate ?? null,
      formattedEndDate ?? null,
    ],
    queryFn: () =>
      getAssetSummary({
        companyId,
        page,
        limit,
        assetType,
        category: "Aset Tetap",
        search: searchTerm,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const assetList = fixAssetSummaryData?.data?.assetList ?? [];
  const totalData = fixAssetSummaryData?.data?.total ?? 0;
  const totalPages = Math.ceil(totalData / limit);
  const totalAssetIn = fixAssetSummaryData?.data?.total_asset ?? 0;

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, totalData);

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteFixAsset } = useDeleteDataJournalEntry();
  const handleDeleteDataJournal = (idToDelete: string) => {
    console.log("idToDelete", idToDelete);
    mutateDeleteDataJournal(idToDelete);
  };

  const openEditModal = (fixAssetSummaryData: IAssetSummaryItem) => {
    useModalStore.getState().openModal("editFixAssetData", fixAssetSummaryData);
  };

  const columns = columnsBaseFixAsset(assetList, {
    // handleSendClick,
    openEditModal,
    handleDeleteDataJournal,
  });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingAssetData || isLoadingDeleteFixAsset} />
      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            Aset Tetap {companyName}
          </Text>
        </Stack>
        <Text size="xl" fw={800} c={"teal"} mt={20}>
          {formatCurrency(fixAssetSummaryData?.data.total_asset ?? 0)}
        </Text>
      </Group>
      <SearchTable
        companyId={companyId}
        category="Aset Tetap"
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
      <TableComponent
        startIndex={startIndex}
        data={assetList}
        totalAmount={totalAssetIn}
        transactionType={transactionType}
        height={"580"}
        columns={columns}
      />

      <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType="payin" />

      {totalPages > 0 && (
        <Stack gap="xs" mt="40" style={{ paddingBottom: "16px" }}>
          <Pagination total={totalPages} value={page} onChange={setPage} />
          <Text size="sm" c="dimmed">
            Menampilkan {startIndex} sampai {endIndex} dari {fixAssetSummaryData?.data.total} data
          </Text>
        </Stack>
      )}
    </Card>
  );
};
