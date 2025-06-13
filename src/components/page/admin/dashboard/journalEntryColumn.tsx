import { formatCurrency } from "@/helper/formatCurrency";
import { formatDateIndonesia } from "@/helper/formatDateIndonesia";
export const columnsBaseJournalEntry = () => {
  return [
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
  ];
};
