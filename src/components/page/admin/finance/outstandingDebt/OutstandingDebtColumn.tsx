import BreathingActionIcon from "@/components/common/button/buttonAction";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import ButtonReversedJournal from "@/components/common/button/buttonReversedJournal";
import {
  calculateDaysLeft,
  formatDaysToDueMessage,
  formatEarlyOrLateTransaction,
  getColorForPaidStatus,
  getStatusColor,
} from "@/helper/debtStatus";
import { formatCurrency } from "@/helper/formatCurrency";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import { Badge, Box, Flex, Text } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

export const columnsBaseDebt = (
  handleSendClick: (item: IDebtSummaryItem) => void,
  openEditModal: (item: IDebtSummaryItem) => void,
  handleDeleteDataJournal: (id: string) => void,
  shouldShowPaymentStatus: boolean
) => [
  { key: "transaction_id", title: "Transaction ID", width: 140, minWidth: 140 },
  { key: "invoice", title: "Invoice", width: 160, minWidth: 160 },
  { key: "partner", title: "Partner", width: 160, minWidth: 160 },
  { key: "credit_category", title: "Kategori", width: 120, minWidth: 120 },

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
  {
    key: "status",
    title: "Status",
    width: 320,
    minWidth: 220,
    render: (item) => {
      const isPaid = item.status === "done";
      const earlyLate = formatEarlyOrLateTransaction(item.date_inputed, item.due_date);

      if (isPaid) {
        const color = getColorForPaidStatus(item.date_inputed, item.due_date);

        return (
          <Box style={{ width: 300 }}>
            <Badge color={color} p={8}>
              <Text fw={700} size="xs">
                {earlyLate}
              </Text>
            </Badge>
          </Box>
        );
      }

      const daysLeft = calculateDaysLeft(item.due_date);
      return (
        <Box style={{ width: 320 }}>
          <Badge color={getStatusColor(daysLeft)} p={8}>
            <Text fw={700} size="xs">
              {formatDaysToDueMessage(daysLeft)}
            </Text>
          </Badge>
        </Box>
      );
    },
  },
  ...(shouldShowPaymentStatus
    ? [
        {
          key: "payment_date_status",
          title: "Keterangan Pembayaran",
          width: 400,
          minWidth: 400,
          render: (row: { payment_date_status: string }) => row.payment_date_status,
        },
      ]
    : []),
  { key: "description", title: "Deskripsi", width: 400, minWidth: 400 },
  {
    key: "aksi",
    title: "Aksi",
    width: 10,
    minWidth: 10,
    render: (row: IDebtSummaryItem) => {
      return (
        <Flex gap="lg" justify="center">
          {row.status !== "done" && <ButtonReversedJournal size={2.2} onClick={() => handleSendClick(row)} />}
          <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="2rem" />} size="2.2rem" />
          <ButtonDeleteWithConfirmation
            id={row.id}
            onDelete={() => handleDeleteDataJournal(row.id)}
            description={`Hapus Transaksi ${row.description}?`}
            size={2.2}
          />
        </Flex>
      );
    },
  },
];
