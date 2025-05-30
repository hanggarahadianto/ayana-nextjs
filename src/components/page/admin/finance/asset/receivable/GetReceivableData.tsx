import { Card, Text, Group, Stack, Box, Pagination, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/utils/formatCurrency";
import { getAssetSummary } from "@/api/finance/getAssetSummary";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";
import SelectCategoryFilter from "@/components/common/select/SelectCategoryFilter";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import { IconPencil } from "@tabler/icons-react";
import { useModalStore } from "@/store/modalStore";
import UpdateJournalEntryModal from "../../journalEntry/UpdateJournalEntryModal";
import ButtonReversedJournal from "@/components/common/button/buttonReversedJournal";
import ReversedJournalEntryModal from "../../journalEntry/ReversedJournalEntryModal";

interface AssetSummaryCardProps {
  companyId: string;
  companyName?: string;
  assetType?: string;
  transactionType: "payout" | "payin";
  title: string;
}

export const GetReceivableAssetData = ({ companyId, companyName, assetType, transactionType, title }: AssetSummaryCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [selectedReceivableAsset, setSelectedReceivableAsset] = useState<IAssetSummaryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: receivableAssetSummaryData, isPending: isLoadingReceivableAsset } = useQuery({
    queryKey: ["getReceivableAssetData", companyId, page, assetType, selectedCategory],
    queryFn: () =>
      getAssetSummary({
        companyId,
        page,
        limit,
        assetType,
        category: "Piutang", // Hardcoded for Receivable Asset
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

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingReceivableAsset || isLoadingDeleteRecivableAsset} />
      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            {title} {companyName}
          </Text>

          <SelectCategoryFilter
            companyId={companyId}
            value={"Piutang"} // Hardcoded for Receivable Asset
            onChange={(value) => {
              setSelectedCategory(value);
            }}
            readonly
          />
        </Stack>
        <Text size="xl" fw={800} c={"teal"} mt={20}>
          {formatCurrency(receivableAssetSummaryData?.data.total_asset ?? 0)}
        </Text>
      </Group>

      <Box style={{ flex: 1 }}>
        <TableComponent
          startIndex={startIndex}
          data={assetList}
          totalAmount={totalAssetIn}
          transactionType={transactionType}
          height={"580"}
          columns={[
            { key: "transaction_id", title: "Transaction ID", width: 80, minWidth: 80 },
            { key: "invoice", title: "Invoice", width: 120, minWidth: 120 },
            { key: "partner", title: "Partner", width: 80, minWidth: 80 },
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
            { key: "note", title: "Keterangan", width: 220, minWidth: 220 },
            {
              key: "aksi",
              title: "Aksi",
              width: 1,
              minWidth: 1,
              render: (row: IAssetSummaryItem) => {
                return (
                  <Flex gap="lg" justify="center">
                    {row.status !== "paid" && <ButtonReversedJournal size={2.2} onClick={() => handleSendClick(row)} />}
                    <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="2rem" />} size={"2.2rem"} />
                    <ButtonDeleteWithConfirmation
                      id={row.id} // Gunakan id customer
                      onDelete={() => handleDeleteDataJournal(row.id)}
                      description={`Hapus Transaksi ${row.description}?`}
                      size={2.2}
                    />
                  </Flex>
                );
              },
            },
          ]}
        />
      </Box>
      <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType={transactionType} />

      {totalPages > 0 && (
        <Stack gap="xs" mt={"md"} style={{ paddingBottom: "16px" }}>
          <Pagination total={totalPages} value={page} onChange={setPage} />
          <Text size="sm" c="dimmed">
            Menampilkan {startIndex} sampai {endIndex} dari {receivableAssetSummaryData?.data.total} data
          </Text>
        </Stack>
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
