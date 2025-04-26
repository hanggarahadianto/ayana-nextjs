import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateIndonesia } from "@/utils/formatDateIndonesia";
import { Group, ScrollArea, Table, ThemeIcon } from "@mantine/core";

interface AssetSummaryTableProps {
  data: IAssetSummaryItem[];
  onRowClick?: (AssetSummary: IAssetSummaryItem) => void;
  onDelete?: (id: string) => void;
  startIndex?: number;
}

export default function AssetSummaryTable({ data, startIndex = 1 }: AssetSummaryTableProps) {
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
              {/* <Table.Td>{AssetSummary.code}</Table.Td>
              <Table.Td>{AssetSummary.name}</Table.Td>
              {/* <Table.Td>{AssetSummary.type}</Table.Td> */}
              {/* <Table.Td>{AssetSummary.category}</Table.Td> */}
              <Table.Td>{startIndex + index}</Table.Td>

              <Table.Td>{formatDateIndonesia(AssetSummary?.date_inputed)}</Table.Td>
              <Table.Td>{formatCurrency(AssetSummary?.amount)}</Table.Td>
              <Table.Td>{AssetSummary?.description}</Table.Td>
              {/* <Table.Td style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                <Group ml={4}>
                  <PayAssetSummaryButton AssetSummary={AssetSummary} refetchAssetSummaryData={refetchAssetSummaryData} />
                  <EditAssetSummaryModal AssetSummary={AssetSummary} refetchAssetSummaryData={refetchAssetSummaryData} />
                  <ButtonDeleteWithConfirmation
                    id={AssetSummary.id}
                    onDelete={onDelete}
                    description={`Apakah Anda yakin ingin menghapus invoice ${AssetSummary.invoice}?`}
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
