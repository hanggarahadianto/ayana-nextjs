// columnsReceivableAsset.ts

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
import { Box, Badge, Text, Flex } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

export const columnsBaseReceivableAsset = (
  assetList: IAssetSummaryItem[],
  handlers: {
    handleSendClick: (row: IAssetSummaryItem) => void;
    openEditModal: (row: IAssetSummaryItem) => void;
    handleDeleteDataJournal: (id: string) => void;
  }
) => {
  // Cek apakah ada item dengan status "done"
  const hasDone = assetList.some((item) => item.status === "done");

  return [
    { key: "transaction_id", title: "Transaction ID", width: 120, minWidth: 120 },
    { key: "invoice", title: "Invoice", width: 120, minWidth: 120 },
    { key: "partner", title: "Partner", width: 160, minWidth: 160 },
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
      render: (item: IAssetSummaryItem) => formatDateIndonesia(item.date_inputed),
    },
    {
      key: "due_date",
      title: "Jatuh Tempo",
      width: 160,
      minWidth: 160,
      render: (item: IAssetSummaryItem) => formatDateIndonesia(item.due_date),
    },

    // Jika ada yang status "done", tambahkan kolom repayment_date di sini
    ...(hasDone
      ? [
          {
            key: "repayment_date",
            title: "Tanggal Pelunasan",
            width: 160,
            minWidth: 160,
            render: (row: IAssetSummaryItem) => formatDateIndonesia(row.repayment_date),
          },
        ]
      : []),

    { key: "note", title: "Keterangan", width: 220, minWidth: 220 },

    {
      key: "status",
      title: "Status",
      width: 320,
      minWidth: 220,
      render: (item: IAssetSummaryItem) => {
        const isPaid = item.status === "done";
        const earlyLate = formatEarlyOrLateTransaction(item.repayment_date, item.due_date);

        if (isPaid) {
          const color = getColorForPaidStatus(item.repayment_date, item.due_date);

          return (
            <Box style={{ width: 200 }}>
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

    {
      key: "aksi",
      title: "Aksi",
      width: 1,
      minWidth: 1,
      render: (row: IAssetSummaryItem) => (
        <Flex gap="lg" justify="center">
          {row.status !== "paid" && <ButtonReversedJournal size={2.2} onClick={() => handlers.handleSendClick(row)} />}
          <BreathingActionIcon onClick={() => handlers.openEditModal(row)} icon={<IconPencil size="2rem" />} size={"2.2rem"} />
          <ButtonDeleteWithConfirmation
            id={row.id}
            onDelete={() => handlers.handleDeleteDataJournal(row.id)}
            description={`Hapus Transaksi ${row.description}?`}
            size={2.2}
          />
        </Flex>
      ),
    },
  ];
};
