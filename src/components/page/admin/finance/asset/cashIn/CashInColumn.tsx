import BreathingActionIcon from "@/components/common/button/buttonAction";
import ButtonDeleteWithConfirmation from "@/components/common/button/ButtonDeleteWithConfirmation";
import { formatCurrency } from "@/helper/formatCurrency";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import { Flex } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

export const columnsBaseCashIn = (
  mutateDeleteJournal: (ids: string[]) => void,
  openEditModal: (item: IAssetSummaryItem) => void,
  isLoadingCashinData: boolean // ✅ tambahkan ini sebagai argumen
) => [
  { key: "transaction_id", title: "Transaction ID", width: 80, minWidth: 80 },
  { key: "invoice", title: "Invoice", width: 80, minWidth: 80 },
  { key: "partner", title: "Partner", width: 180, minWidth: 180 },
  { key: "credit_category", title: "Kategori", width: 120, minWidth: 120 },

  {
    key: "amount",
    title: "Nominal",
    width: 120,
    minWidth: 120,
    render: (item: IAssetSummaryItem) => formatCurrency(item.amount),
  },
  {
    key: "date_inputed",
    title: "Tanggal Transaksi",
    width: 160,
    minWidth: 160,
    render: (item: IAssetSummaryItem) => (item.date_inputed ? formatDateIndonesia(item.date_inputed) : " - "),
  },
  { key: "note", title: "Keterangan", width: 220, minWidth: 220 },
  {
    key: "aksi",
    title: "Aksi",
    width: 8,
    minWidth: 8,
    render: (row: IAssetSummaryItem) => (
      <Flex gap="lg" justify="center">
        <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="2rem" />} size="2.2rem" />
        <ButtonDeleteWithConfirmation
          isLoading={isLoadingCashinData}
          onDelete={() => mutateDeleteJournal([row.id])} // langsung kirim array
          description={`Hapus Transaksi ${row.description}?`}
          size={2.2}
        />
      </Flex>
    ),
  },
];
