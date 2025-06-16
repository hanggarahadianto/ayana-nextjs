import BreathingActionIcon from "@/components/common/button/buttonAction";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import ButtonReversedJournal from "@/components/common/button/buttonReversedJournal";
import { formatCurrency } from "@/helper/formatCurrency";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import { Flex } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";

export const columnsBaseReceivableAsset = (
  assetList: IAssetSummaryItem[],
  handlers: {
    handleSendClick: (row: IAssetSummaryItem) => void;
    openEditModal: (row: IAssetSummaryItem) => void;
    handleDeleteDataJournal: (id: string) => void;
  }
) => {
  const hasDone = assetList.some((item) => item.status === "done");

  return [
    { key: "transaction_id", title: "Transaction ID", width: 120, minWidth: 120 },
    { key: "invoice", title: "Invoice", width: 120, minWidth: 120 },
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
      width: 120,
      minWidth: 120,
      render: (item: IAssetSummaryItem) => (item.date_inputed ? formatDateIndonesia(item.date_inputed) : " - "),
    },
    {
      key: "due_date",
      title: "Jatuh Tempo",
      width: 120,
      minWidth: 120,
      render: (item: IAssetSummaryItem) => (item.due_date ? formatDateIndonesia(item.due_date) : " - "),
    },

    {
      key: "aksi",
      title: "Aksi",
      width: 1,
      minWidth: 1,
      maxWidth: 4,
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
