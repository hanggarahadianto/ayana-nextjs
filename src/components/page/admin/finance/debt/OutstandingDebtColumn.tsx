import BreathingActionIcon from "@/components/common/button/buttonAction";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import ButtonReversedJournal from "@/components/common/button/buttonReversedJournal";
import { formatCurrency } from "@/helper/formatCurrency";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import { Badge, Flex, Text } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

type ColumnType<T> = {
  key: string;
  title: string;
  width?: number;
  minWidth?: number;
  render?: (item: T) => React.ReactNode;
};

export const columnsBaseDebt = (
  handleSendClick: (item: IDebtSummaryItem) => void,
  openEditModal: (item: IDebtSummaryItem) => void,
  mutateDeleteJournal: (ids: string[]) => void,
  debtType: string,
  isLoading: boolean
): ColumnType<IDebtSummaryItem>[] => {
  const baseColumns: ColumnType<IDebtSummaryItem>[] = [
    { key: "transaction_id", title: "Transaction ID", width: 140, minWidth: 140 },
    { key: "invoice", title: "Invoice", width: 160, minWidth: 160 },
    { key: "partner", title: "Partner", width: 280, minWidth: 280 },
    {
      key: "kategori",
      title: "Kategori",
      width: 180,
      minWidth: 180,
      render: (item) => (debtType === "going" ? item.debit_category || "-" : item.credit_category || "-"),
    },
    {
      key: "amount",
      title: "Nominal",
      width: 180,
      minWidth: 180,
      render: (item) => formatCurrency(item.amount),
    },
    {
      key: "date_inputed",
      title: "Tanggal Transaksi",
      width: 180,
      minWidth: 180,
      render: (item) => formatDateIndonesia(item.date_inputed),
    },
    {
      key: "due_date",
      title: "Tanggal Jatuh Tempo",
      width: 180,
      minWidth: 180,
      render: (item) => formatDateIndonesia(item.due_date),
    },
  ];

  // ✅ Tambahkan repayment_date jika status !== "going"
  if (debtType !== "going") {
    baseColumns.push({
      key: "repayment_date",
      title: "Tanggal Pelunasan",
      width: 180,
      minWidth: 180,
      render: (item) => (item.repayment_date ? formatDateIndonesia(item.repayment_date) : "-"),
    });
  }

  baseColumns.push(
    {
      key: "payment_note",
      title: "Status Pembayaran",
      width: 280,
      render: (item) => {
        const note = item.payment_note || "-";
        const color = item.payment_note_color || "gray";

        return (
          <Badge color={color} p={10}>
            <Text fw={600} size="11px">
              {note}
            </Text>
          </Badge>
        );
      },
    },
    {
      key: "description",
      title: "Deskripsi",
      width: 400,
      minWidth: 400,
    },
    {
      key: "aksi",
      title: "Aksi",
      width: 10,
      minWidth: 10,
      render: (row) => (
        <Flex gap="lg" justify="center">
          {row.status !== "done" && <ButtonReversedJournal size={2.2} onClick={() => handleSendClick(row)} />}
          <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="2rem" />} size="2.2rem" />
          <ButtonDeleteWithConfirmation
            isLoading={isLoading}
            onDelete={() => mutateDeleteJournal([row.id])} // langsung kirim array
            description={`Hapus Transaksi ${row.description}?`}
            size={2.2}
          />
        </Flex>
      ),
    }
  );

  return baseColumns;
};
