// components/finance/CashSummaryTable.tsx
import { Table, ScrollArea, Text } from "@mantine/core";
import { formatCurrency } from "@/utils/formatCurrency"; // Pastikan sudah ada utilitas formatCurrency

interface CashSummaryTableProps {
  data: ICashSummaryItem[];
}

const CashSummaryTable = ({ data }: CashSummaryTableProps) => {
  return (
    <ScrollArea style={{ minHeight: 200 }}>
      <Table highlightOnHover withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: "center", width: 160, minWidth: 160 }}>Tanggal</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 200, minWidth: 200 }}>Nominal</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 400, minWidth: 400 }}>Deskripsi</Table.Th>
            <Table.Th>Keterangan</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>{item.date}</Table.Td>
              <Table.Td>{formatCurrency(item.amount)}</Table.Td>
              <Table.Td>{item.description}</Table.Td>
              <Table.Td>{item.note}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default CashSummaryTable;
