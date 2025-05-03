import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";
import { ScrollArea, Table } from "@mantine/core";

interface ExpenseSummaryTableProps {
  data: IExpenseSummaryItem[];
  startIndex?: number;
}

export const ExpenseSummaryTable = ({ data, startIndex = 1 }: ExpenseSummaryTableProps) => {
  return (
    <ScrollArea style={{ minHeight: 380 }} p={"xl"}>
      {/* <ScrollArea style={{ height: "400px" }} p="xl"> */}
      <Table
        highlightOnHover
        withColumnBorders
        style={{
          tableLayout: "fixed",
          width: "100%",
          minWidth: 700,
          maxWidth: "100%",
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: "center", width: 10, minWidth: 10 }}>No</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 100, minWidth: 100 }}>Invoice</Table.Th>

            <Table.Th style={{ textAlign: "center", width: 100, minWidth: 100 }}>Tanggal Pembayaran</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 100, minWidth: 100 }}>Nominal</Table.Th>
            {/* <Table.Th style={{ textAlign: "center", width: 140, minWidth: 140 }}>Kategori</Table.Th> */}
            <Table.Th style={{ textAlign: "center", width: 180, minWidth: 180 }}>Deskripsi</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 100, minWidth: 100 }}>Partner</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((ExpenseSummary: IExpenseSummaryItem, index: number) => (
            <Table.Tr key={ExpenseSummary.id} style={{ cursor: "pointer" }}>
              <Table.Td>{startIndex + index}</Table.Td>
              <Table.Td>{ExpenseSummary?.invoice}</Table.Td>

              <Table.Td>{formatDateIndonesia(ExpenseSummary?.date_inputed)}</Table.Td>
              <Table.Td>{formatCurrency(ExpenseSummary?.amount)}</Table.Td>
              <Table.Td>{ExpenseSummary?.description}</Table.Td>
              <Table.Td>{ExpenseSummary?.partner}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
