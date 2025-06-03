import { Card, Text, Group, Stack, Pagination, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/helper/formatCurrency";
import CreateJournalEntryModal from "../../journalEntry/CreateJournalEntryModal";
import { getAssetSummary } from "@/api/finance/getAssetSummary";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import { IconPencil } from "@tabler/icons-react";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import { useModalStore } from "@/store/modalStore";
import UpdateJournalEntryModal from "../../journalEntry/UpdateJournalEntryModal";
import SearchTable from "@/components/common/table/SearchTableComponent";

interface CashSummaryCardProps {
  companyId: string;
  companyName?: string;
  assetType?: string;
  transactionType: string;
}

export const GetCashinData = ({ companyId, companyName, assetType, transactionType }: CashSummaryCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { data: cashinSummaryData, isPending: isLoadingCashinData } = useQuery({
    queryKey: ["getCashinData", companyId, page, assetType, selectedCategory, searchTerm],
    queryFn: () =>
      getAssetSummary({
        companyId,
        page,
        limit,
        assetType,
        category: "Kas & Bank", // Hardcoded for Cash In
        search: searchTerm, // 🔍
      }),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });
  const cashInList = cashinSummaryData?.data.assetList ?? [];

  const totalPages = Math.ceil((cashinSummaryData?.data?.total ?? 0) / limit);

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, cashinSummaryData?.data.total || 0);

  const openEditModal = (cashInAsset: IAssetSummaryItem) => {
    useModalStore.getState().openModal("editCashInData", cashInAsset);
  };

  const { mutate: mutateDeleteDataJournal, isPending: isLoadingDeleteCashIn } = useDeleteDataJournalEntry();
  const handleDeleteAccount = (idToDelete: string) => {
    console.log("idToDelete", idToDelete);
    mutateDeleteDataJournal(idToDelete);
  };

  return (
    <Card shadow="sm" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingCashinData || isLoadingDeleteCashIn} />
      <Stack>
        <Group justify="space-between">
          <Stack>
            <Text size="xl" fw={600}>
              Uang Masuk {companyName}
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
            companyId={companyId}
            category="Kas & Bank"
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
        </Stack>
      </Stack>

      <TableComponent
        startIndex={startIndex}
        data={cashInList}
        totalAmount={cashinSummaryData?.data.total_asset}
        transactionType={transactionType}
        height={"580"}
        columns={[
          { key: "transaction_id", title: "Transaction ID", width: 80, minWidth: 80 },
          { key: "invoice", title: "Invoice", width: 120, minWidth: 120 },
          { key: "category", title: "Kategori", width: 120, minWidth: 120 },
          { key: "partner", title: "Partner", width: 120, minWidth: 120 },
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
            width: 160,
            minWidth: 160,
            render: (item) => formatDateIndonesia(item.date_inputed),
          },
          { key: "note", title: "Keterangan", width: 220, minWidth: 220 },
          {
            key: "aksi",
            title: "Aksi",
            width: 8,
            minWidth: 8,
            render: (row: IAssetSummaryItem) => {
              return (
                <Flex gap="lg" justify="center">
                  <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="2rem" />} size={"2.2rem"} />
                  <ButtonDeleteWithConfirmation
                    id={row.transaction_category_id} // Gunakan id customer
                    onDelete={() => handleDeleteAccount(row.id)}
                    description={`Hapus Transaksi ${row.description}?`}
                    size={2.2}
                  />
                </Flex>
              );
            },
          },
        ]}
      />

      <UpdateJournalEntryModal initialValues={useModalStore((state) => state.modalData)} transactionType="payin" />

      {totalPages > 0 && (
        <Stack gap="xs" mt="40" style={{ paddingBottom: "16px" }}>
          <Pagination total={totalPages} value={page} onChange={setPage} />
          <Text size="sm" c="dimmed">
            Menampilkan {startIndex} sampai {endIndex} dari {cashinSummaryData?.data.total} data
          </Text>
        </Stack>
      )}
    </Card>
  );
};
