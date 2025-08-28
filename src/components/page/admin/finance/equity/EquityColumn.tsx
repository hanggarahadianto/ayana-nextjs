import { formatCurrency } from "@/helper/formatCurrency";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import { Flex } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import ButtonDeleteWithConfirmation from "@/components/common/button/ButtonDeleteWithConfirmation";

export const columnsBaseEquity = (
  mutateDeleteJournal: (ids: string[]) => void,
  openEditModal: (row: IEquitySummaryItem) => void,
  isLoading: boolean
) => [
  { key: "transaction_id", title: "Transaction ID", width: 40, minWidth: 40 },
  { key: "invoice", title: "Invoice", width: 100, minWidth: 100 },
  { key: "partner", title: "Partner", width: 120, minWidth: 120 },
  {
    key: "amount",
    title: "Nominal",
    width: 120,
    minWidth: 120,
    render: (item: IEquitySummaryItem) => formatCurrency(item.amount),
  },
  {
    key: "date_inputed",
    title: "Tanggal Transaksi",
    width: 120,
    minWidth: 120,
    render: (item: IEquitySummaryItem) => formatDateIndonesia(item.date_inputed),
  },
  { key: "note", title: "Keterangan", width: 220, minWidth: 220 },
  {
    key: "aksi",
    title: "Aksi",
    width: 10,
    minWidth: 10,
    render: (row: IEquitySummaryItem) => (
      <Flex gap="lg" justify="center">
        <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="2rem" />} size={"2.2rem"} />
        <ButtonDeleteWithConfirmation
          isLoading={isLoading}
          onDelete={() => mutateDeleteJournal([row.id])} // langsung kirim array
          description={`Hapus Transaksi ${row.description}?`}
          size={2.2}
        />
      </Flex>
    ),
  },
];
