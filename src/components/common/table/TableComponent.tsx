import { formatCurrency } from "@/utils/formatCurrency";
import { Table, Card, Select, Text, Group, Box, Stack, Divider } from "@mantine/core";
import React, { ReactNode, useState } from "react";

// Tipe untuk props ScrollXWrapper

interface ScrollXWrapperProps {
  children: ReactNode;
  minWidth?: string | number;
  height: string | number; // ← bukan lagi optional
}

// Komponen ScrollXWrapper untuk membungkus konten dan memberikan scroll horizontal
function ScrollXWrapper({ children, minWidth = "1000px", height }: ScrollXWrapperProps) {
  return (
    <div style={{ width: "100%", overflowX: "auto", height }}>
      <div style={{ minWidth, height: "100%", minHeight: 600 }}>{children}</div>
    </div>
  );
}

// Tipe data untuk kolom pada tabel
interface Column<T> {
  key: string;
  title: string;
  width?: number | string;
  minWidth?: number | string;
  render?: (item: T) => ReactNode;
}

// Props untuk komponen tabel
interface TableComponentProps<T> {
  companyName?: string;
  data: T[];
  columns: Column<T>[];
  startIndex?: number;
  onRowClick?: (item: T) => void;
  totalAmount?: number; // Menambahkan properti untuk menampilkan total amount yang dapat disesuaikan
  title?: string;
  transactionType?: string;
  height?: string | number; // ← Tambahkan ini
}

// Komponen Tabel utama
export default function TableComponent<T>({
  companyName,
  data,
  columns,
  startIndex = 1,
  onRowClick,
  totalAmount = 0, // Menyediakan nilai default 0 untuk totalAmount
  title,
  transactionType,
  height, // ← Terima props height
}: TableComponentProps<T>) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div>
      {/* Menambahkan Box dengan layout flex untuk menata tampilan */}
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "14vh",
          maxHeight: "42vh",
          justifyContent: "space-between",
        }}
      >
        {/* Menambahkan Card untuk Select dan Title */}
        <Card shadow="xl">
          <Group justify="space-between">
            <Stack>
              <Text size="xl" fw={600}>
                {title} {companyName}
              </Text>
              {/* <Select
                label="Pilih Tipe"
                placeholder="Pilih"
                value={selectedType}
                onChange={setSelectedType}
                data={["Tipe 1", "Tipe 2", "Tipe 3"]} // Data untuk Select, bisa diubah sesuai kebutuhan
                style={{ width: 250 }}
              /> */}
            </Stack>
            {
              (totalAmount = 0 && (
                <Text fw={800} size="xl" c={transactionType === "payin" ? "green" : "red"}>
                  {formatCurrency(totalAmount)}
                </Text>
              ))
            }
          </Group>
        </Card>
      </Box>

      {/* Tabel dengan ScrollXWrapper */}
      <ScrollXWrapper minWidth={`${columns.length * 200}px`} height={height || "400px"}>
        <Table highlightOnHover withColumnBorders striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th
                style={{
                  textAlign: "left",
                  width: 50,
                  minWidth: 30,
                  maxWidth: 60,
                  padding: "0 8px",
                }}
              >
                No
              </Table.Th>
              {columns.map((column) => (
                <Table.Th
                  key={column.key}
                  style={{
                    textAlign: "left",
                    width: column.width,
                    minWidth: column.minWidth || 150,
                  }}
                >
                  {column.title}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((item, index) => (
              <Table.Tr key={index} style={{ cursor: onRowClick ? "pointer" : "default" }} onClick={() => onRowClick && onRowClick(item)}>
                <Table.Td style={{ textAlign: "left", minWidth: 50 }}>{startIndex + index}</Table.Td>
                {columns.map((column) => (
                  <Table.Td
                    key={column.key}
                    style={{
                      textAlign: "left",
                      minWidth: column.minWidth || 150,
                    }}
                  >
                    {column.render ? column.render(item) : (item as any)[column.key]}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollXWrapper>
    </div>
  );
}
