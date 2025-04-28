import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";
import { ScrollArea, Table } from "@mantine/core";

interface FixedAssetTableProps {
  data: IAssetSummaryItem[];
  onRowClick?: (AssetSummary: IAssetSummaryItem) => void;
  onDelete?: (id: string) => void;
  startIndex?: number;
}

export default function FixedAsset({ data, startIndex = 1 }: FixedAssetTableProps) {
  // console.log("data AssetSummary table", data);
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
          {data.map((AssetSummary: IAssetSummaryItem, index: number) => (
            <Table.Tr
              key={AssetSummary.id}
              // onClick={() => onRowClick(AssetSummary)}
              style={{ cursor: "pointer" }}
            >
              <Table.Td>{startIndex + index}</Table.Td>

              <Table.Td>{formatDateIndonesia(AssetSummary?.date_inputed)}</Table.Td>
              <Table.Td>{formatCurrency(AssetSummary?.amount)}</Table.Td>
              <Table.Td>{AssetSummary?.description}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
