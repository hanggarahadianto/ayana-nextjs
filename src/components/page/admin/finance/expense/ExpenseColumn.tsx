import { formatCurrency } from "@/helper/formatCurrency";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import BreathingActionIcon from "@/components/common/button/buttonAction";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { Flex } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

export const columnsBaseExpense = (openEditModal: (row: IExpenseSummaryItem) => void, handleDeleteDataJournal: (id: string) => void) => [
  { key: "transaction_id", title: "Transaction ID", width: 30, minWidth: 30 },
  { key: "invoice", title: "Invoice", width: 60, minWidth: 60 },
  { key: "partner", title: "Partner", width: 180, minWidth: 180 },
  // { key: "credit_category", title: "Kategori", width: 120, minWidth: 120 },
  {
    key: "amount",
    title: "Nominal",
    width: 120,
    minWidth: 120,
    render: (item: IExpenseSummaryItem) => formatCurrency(item.amount),
  },
  {
    key: "date_inputed",
    title: "Tanggal Transaksi",
    width: 120,
    minWidth: 120,
    render: (item: IExpenseSummaryItem) => formatDateIndonesia(item.date_inputed),
  },
  { key: "note", title: "Keterangan", width: 220, minWidth: 220 },
  {
    key: "aksi",
    title: "Aksi",
    width: 10,
    minWidth: 10,
    render: (row: IExpenseSummaryItem) => (
      <Flex gap="lg" justify="center">
        <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="2rem" />} size={"2.2rem"} />
        <ButtonDeleteWithConfirmation
          id={row.id}
          onDelete={() => handleDeleteDataJournal(row.id)}
          description={`Hapus Transaksi ${row.description}?`}
          size={2.2}
        />
      </Flex>
    ),
  },
];
