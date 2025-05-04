import { Table } from "@mantine/core";
import React, { ReactNode } from "react";

// Tipe untuk props ScrollXWrapper
interface ScrollXWrapperProps {
  children: ReactNode;
  minWidth?: string | number;
  height?: string | number;
}

// Komponen ScrollXWrapper untuk membungkus konten dan memberikan scroll horizontal
function ScrollXWrapper({
  children,
  minWidth = "1000px",
  height = "480px", // ← default tinggi statis
}: ScrollXWrapperProps) {
  return (
    <div style={{ width: "100%", overflowX: "auto", height }}>
      <div style={{ minWidth }}>{children}</div>
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
}

// Komponen Tabel utama
export default function TableComponent<T>({ data, columns, startIndex = 1, onRowClick }: TableComponentProps<T>) {
  console.log("start index di table", startIndex);
  return (
    <ScrollXWrapper minWidth={`${columns.length * 200}px`}>
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
  );
}
