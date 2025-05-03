import { ScrollArea, Table } from "@mantine/core";
import { ReactNode } from "react";

interface Column<T> {
  key: string;
  title: string;
  width?: number;
  minWidth?: number;
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
    <ScrollArea style={{ minHeight: 400 }} p="xl">
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
            <Table.Th style={{ textAlign: "left", width: 50, minWidth: 50 }}>No</Table.Th>
            {columns.map((column) => (
              <Table.Th
                key={column.key}
                style={{
                  textAlign: "left",
                  width: column.width,
                  minWidth: column.minWidth,
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
              <Table.Td style={{ textAlign: "left" }}>{startIndex + index}</Table.Td>
              {columns.map((column) => (
                <Table.Td key={column.key} style={{ textAlign: "left" }}>
                  {column.render ? column.render(item) : (item as any)[column.key]}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
