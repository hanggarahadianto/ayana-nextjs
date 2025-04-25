import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";
import { Group, ScrollArea, Table, ThemeIcon } from "@mantine/core";

interface ExpenseSummaryTableProps {
  data: IExpenseSummaryItem[];
  onRowClick?: (ExpenseSummary: IExpenseSummaryItem) => void;
  onDelete?: (id: string) => void;
  startIndex?: number;
}

export default function ExpenseSummaryTable({ data, startIndex = 1 }: ExpenseSummaryTableProps) {
  // console.log("data ExpenseSummary table", data);
  return (
    <ScrollArea style={{ minHeight: 400 }} p={"xl"}>
      <Table
        // Menggunakan token ukuran Mantine (xs, sm, md, lg, xl)
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

            <Table.Th style={{ textAlign: "center", width: 100, minWidth: 100 }}>Tanggal Pembayaran</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 100, minWidth: 100 }}>Nominal</Table.Th>
            {/* <Table.Th style={{ textAlign: "center", width: 140, minWidth: 140 }}>Kategori</Table.Th> */}
            <Table.Th style={{ textAlign: "center", width: 180, minWidth: 180 }}>Deskripsi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((expenseSummary: IExpenseSummaryItem, index: number) => (
            <Table.Tr
              key={expenseSummary.id}
              // onClick={() => onRowClick(ExpenseSummary)}
              style={{ cursor: "pointer" }}
            >
              {/* <Table.Td>{ExpenseSummary.code}</Table.Td>
              <Table.Td>{ExpenseSummary.name}</Table.Td>
              {/* <Table.Td>{ExpenseSummary.type}</Table.Td> */}
              {/* <Table.Td>{ExpenseSummary.category}</Table.Td> */}
              <Table.Td>{startIndex + index}</Table.Td>

              <Table.Td>{formatDateIndonesia(expenseSummary?.date_inputed)}</Table.Td>
              <Table.Td>{formatCurrency(expenseSummary?.amount)}</Table.Td>
              <Table.Td>{expenseSummary?.description}</Table.Td>
              {/* <Table.Td style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                <Group ml={4}>
                  <PayExpenseSummaryButton ExpenseSummary={ExpenseSummary} refetchExpenseSummaryData={refetchExpenseSummaryData} />
                  <EditExpenseSummaryModal ExpenseSummary={ExpenseSummary} refetchExpenseSummaryData={refetchExpenseSummaryData} />
                  <ButtonDeleteWithConfirmation
                    id={ExpenseSummary.id}
                    onDelete={onDelete}
                    description={`Apakah Anda yakin ingin menghapus invoice ${ExpenseSummary.invoice}?`}
                    size={2}
                  />
                </Group>
              </Table.Td> */}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
