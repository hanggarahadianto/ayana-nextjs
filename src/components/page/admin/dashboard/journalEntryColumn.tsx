import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import { formatCurrency } from "@/helper/formatCurrency";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
import { Checkbox, Flex, Stack } from "@mantine/core";
import { UseListStateHandlers } from "@mantine/hooks";

type CheckboxItem = { id: string; checked: boolean; key: string };

interface Column<T> {
  key: string;
  title: string;
  width?: number;
  minWidth?: number;
  render?: (item: T) => React.ReactNode;
}

export const columnsBaseJournalEntry = (
  handleDeleteJournalEntry: (id: string) => void,
  checkboxStates: CheckboxItem[],
  checkboxHandlers: UseListStateHandlers<CheckboxItem>
): Column<IJournalEntryItem>[] => {
  return [
    {
      key: "checkbox",
      title: "",
      width: 1,
      minWidth: 1,
      render: (item: IJournalEntryItem) => {
        const index = checkboxStates.findIndex((i) => i.id === item.id);
        if (index === -1) return <Checkbox disabled />;
        return (
          <Stack justify="justify-center" align="center">
            <Checkbox
              key={checkboxStates[index].key}
              checked={checkboxStates[index].checked}
              onChange={(e) => checkboxHandlers.setItemProp(index, "checked", e.currentTarget.checked)}
            />
          </Stack>
        );
      },
    },
    { key: "transaction_id", title: "Transaction ID", width: 80, minWidth: 80 },
    { key: "invoice", title: "Invoice", width: 120, minWidth: 120 },
    { key: "partner", title: "Partner", width: 80, minWidth: 80 },
    {
      key: "amount",
      title: "Nominal",
      width: 120,
      minWidth: 120,
      render: (item: IJournalEntryItem) => formatCurrency(item.amount),
    },
    {
      key: "date_inputed",
      title: "Tanggal Transaksi",
      width: 120,
      minWidth: 120,
      render: (item: IJournalEntryItem) => (item.date_inputed ? formatDateIndonesia(item.date_inputed) : "-"),
    },
    {
      key: "note",
      title: "Keterangan",
      width: 220,
      minWidth: 220,
    },
    {
      key: "aksi",
      title: "Aksi",
      width: 20,
      minWidth: 20,
      render: (item: IJournalEntryItem) => (
        <Flex gap="lg" justify="center">
          <ButtonDeleteWithConfirmation
            id={item.transaction_category_id}
            onDelete={() => handleDeleteJournalEntry(item.id)}
            description={`Hapus Transaksi ${item.description || item.transaction_id}?`}
            size={2.2}
          />
        </Flex>
      ),
    },
  ];
};
