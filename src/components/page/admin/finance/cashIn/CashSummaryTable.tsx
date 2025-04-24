import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";
import { ScrollArea, Table } from "@mantine/core";

interface CashSummaryTableProps {
  data: ICashSummaryItem[];
  startIndex?: number;
}

export const CashSummaryTable = ({ data, startIndex = 1 }: CashSummaryTableProps) => {
  console.log("cash table", data);
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
          {data.map((cashSummary: ICashSummaryItem, index: number) => (
            <Table.Tr
              key={cashSummary.id}
              // onClick={() => onRowClick(cashSummary)}
              style={{ cursor: "pointer" }}
            >
              {/* <Table.Td>{cashSummary.code}</Table.Td>
              <Table.Td>{cashSummary.name}</Table.Td>
              {/* <Table.Td>{cashSummary.type}</Table.Td> */}
              {/* <Table.Td>{cashSummary.category}</Table.Td> */}
              <Table.Td>{startIndex + index}</Table.Td>
              <Table.Td>{formatDateIndonesia(cashSummary?.date)}</Table.Td>
              <Table.Td>{formatCurrency(cashSummary?.amount)}</Table.Td>
              <Table.Td>{cashSummary?.note}</Table.Td>
              {/* <Table.Td style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                <Group ml={4}>
                  <PaycashSummaryButton cashSummary={cashSummary} refetchcashSummaryData={refetchcashSummaryData} />
                  <EditcashSummaryModal cashSummary={cashSummary} refetchcashSummaryData={refetchcashSummaryData} />
                  <ButtonDeleteWithConfirmation
                    id={cashSummary.id}
                    onDelete={onDelete}
                    description={`Apakah Anda yakin ingin menghapus invoice ${cashSummary.invoice}?`}
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
};
