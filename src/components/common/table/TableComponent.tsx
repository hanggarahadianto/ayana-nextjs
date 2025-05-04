import { Table } from "@mantine/core";
import React, { ReactNode, JSX } from "react";

interface Column<T> {
  key: string;
  title: string;
  width?: number | string;
  minWidth?: number | string;
  render?: (item: T) => ReactNode;
}

interface TableComponentProps<T> {
  data: T[];
  columns: Column<T>[];
  startIndex?: number;
  onRowClick?: (item: T) => void;
}

export default function TableComponent<T>({ data, columns, startIndex = 1, onRowClick }: TableComponentProps<T>) {
  return (
    <div
      style={{
        overflowX: "scroll",
        overflowY: "hidden",
        width: "100%",
        minHeight: "150px", // ⬅️ Tambahkan ini
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end", // ⬅️ Pastikan scroll di bawah
      }}
    >
      <div style={{ minWidth: `${columns.length * 200}px` }}>
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
                  <Table.Td key={column.key} style={{ textAlign: "left", minWidth: column.minWidth || 150 }}>
                    {column.render ? column.render(item) : (item as any)[column.key]}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
