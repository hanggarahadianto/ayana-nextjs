import BreathingActionIcon from "@/components/common/button/buttonAction";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import ButtonReversedJournal from "@/components/common/button/buttonReversedJournal";
import { formatCurrency } from "@/helper/formatCurrency";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import { Badge, Flex, Text } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

export const columnsBaseReceivableAsset = (
  assetList: IAssetSummaryItem[],
  handlers: {
    handleSendClick: (row: IAssetSummaryItem) => void;
    openEditModal: (row: IAssetSummaryItem) => void;
    handleDeleteDataJournal: (id: string) => void;
  }
) => {
  const { handleSendClick, openEditModal, handleDeleteDataJournal } = handlers;
  const hasDone = assetList.some((item) => item.status === "done");

  const baseColumns = [
    { key: "transaction_id", title: "Transaction ID", width: 110, minWidth: 110 },
    { key: "invoice", title: "Invoice", width: 110, minWidth: 110 },
    { key: "partner", title: "Partner", width: 200, minWidth: 200 },
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
      width: 140,
      minWidth: 120,
      render: (item: IAssetSummaryItem) => (item.date_inputed ? formatDateIndonesia(item.date_inputed) : " - "),
    },
    {
      key: "due_date",
      title: "Jatuh Tempo",
      width: 140,
      minWidth: 120,
      render: (item: IAssetSummaryItem) => (item.due_date ? formatDateIndonesia(item.due_date) : " - "),
    },
    {
      key: "payment_note",
      title: "Status Pembayaran",
      width: 280,
      render: (item: IAssetSummaryItem) => {
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
      render: (row: IAssetSummaryItem) => (
        <Flex gap="lg" justify="center">
          {row.status !== "done" && <ButtonReversedJournal size={2.2} onClick={() => handleSendClick(row)} />}
          <BreathingActionIcon onClick={() => openEditModal(row)} icon={<IconPencil size="2rem" />} size="2.2rem" />
          <ButtonDeleteWithConfirmation
            isLoading={false}
            onDelete={() => handleDeleteDataJournal(row.id)}
            description={`Hapus Transaksi ${row.description}?`}
            size={2.2}
          />
        </Flex>
      ),
    },
  ];

  return baseColumns;
};
