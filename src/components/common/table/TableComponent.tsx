import { formatCurrency } from "@/helper/formatCurrency";
import { Table, Card, Text, Group, Box } from "@mantine/core";
import React, { ReactNode } from "react";

interface ScrollXWrapperProps {
  children: ReactNode;
  minWidth?: string | number;
  height: string | number; // ← bukan lagi optional
}

function ScrollXWrapper({ children, minWidth = "1000px", height }: ScrollXWrapperProps) {
  return (
    <div style={{ width: "100%", overflowX: "auto", height }}>
      <div style={{ minWidth, height: "100%", minHeight: 600, paddingBottom: 24 }}>{children}</div>
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
  data: T[];
  columns: Column<T>[];
  startIndex?: number;
  onRowClick?: (item: T) => void;
  totalAmount?: number; // Menambahkan properti untuk menampilkan total amount yang dapat disesuaikan
  transactionType?: string;
  height?: string | number; // ← Tambahkan ini
}

// Komponen Tabel utama
export default function TableComponent<T>({
  data,
  columns,
  startIndex = 1,
  onRowClick,
  totalAmount = 0, // Menyediakan nilai default 0 untuk totalAmount
  transactionType,
  height, // ← Terima props height
}: TableComponentProps<T>) {
  return (
    <div>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "8vh",
          maxHeight: "14vh",
          justifyContent: "space-between",
        }}
      >
        {/* Menambahkan Card untuk Select dan Title */}
        <Card shadow="xl">
          <Group justify="space-between">
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
      <ScrollXWrapper minWidth={`${columns.length * 220}px`} height={height || "400px"}>
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
