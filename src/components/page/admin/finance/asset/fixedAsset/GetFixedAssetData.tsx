import { Card, Text, Group, Stack, Box, Pagination, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/utils/formatCurrency";
import { getAssetSummary } from "@/api/finance/getAssetSummary";
import TableComponent from "@/components/common/table/TableComponent";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";
import SelectCategoryFilter from "@/components/common/select/SelectCategoryFilter";
import { useDeleteDataJournalEntry } from "@/api/finance/deleteDataJournalEntry";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";

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

  const { data: fixAssetSummaryData, isPending: isLoadingAssetData } = useQuery({
    queryKey: ["getFixedAssetData", companyId, page, assetType, selectedCategory],
    queryFn: () =>
      getAssetSummary({
        companyId,
        page,
        limit,
        assetType,
        category: selectedCategory ?? "",
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

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingAssetData || isLoadingDeleteFixAsset} />
      <Group justify="space-between">
        <Stack>
          <Text size="xl" fw={600}>
            Aset Tetap {companyName}
          </Text>

          <SelectCategoryFilter
            companyId={companyId}
            value={selectedCategory}
            onChange={(value) => {
              setSelectedCategory(value);
            }}
          />
        </Stack>
        <Text size="xl" fw={800} c={"teal"} mt={20}>
          {formatCurrency(fixAssetSummaryData?.data.total_asset ?? 0)}
        </Text>
      </Group>
      <TableComponent
        startIndex={startIndex}
        data={assetList}
        totalAmount={totalAssetIn}
        transactionType={transactionType}
        height={"580"}
        columns={[
          { key: "transaction_id", title: "Transaction ID", width: 80, minWidth: 80 },
          { key: "invoice", title: "Invoice", width: 80, minWidth: 80 },
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

          { key: "description", title: "Deskripsi", width: 220, minWidth: 220 },
          {
            key: "aksi",
            title: "Aksi",
            width: 10,
            minWidth: 10,
            render: (row: IAssetSummaryItem) => {
              // console.log("row", row);
              return (
                <Flex gap="lg" justify="center">
                  {/* <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="2rem" />} size={"2.2rem"} /> */}
                  <ButtonDeleteWithConfirmation
                    id={row.id} // Gunakan id customer
                    onDelete={() => handleDeleteDataJournal(row.journal_entry_id)}
                    description={`Hapus Transaksi ${row.description}?`}
                    size={2.2}
                  />
                </Flex>
              );
            },
          },
        ]}
      />

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
