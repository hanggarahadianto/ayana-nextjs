import { ScrollArea, Table } from "@mantine/core";

interface AccountTableProps {
  data: IAccount[];
  onRowClick?: (account: IAccount) => void;
  onDelete?: (id: string) => void;
  refetchAccountData?: () => void;
  startIndex?: number;
}
export default function AccountTable({ data, onRowClick, refetchAccountData, onDelete, startIndex = 1 }: AccountTableProps) {
  // console.log("data account table", data);

  return (
    <ScrollArea style={{ minHeight: 400 }} p={"xl"}>
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
            <Table.Th style={{ textAlign: "center", width: 10, minWidth: 10 }}>No</Table.Th>

            <Table.Th style={{ textAlign: "center", width: 30, minWidth: 30 }}>Code</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 160, minWidth: 1600 }}>Nama</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 140, minWidth: 140 }}>Kategori</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 180, minWidth: 180 }}>Deskripsi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((account: IAccount, index: number) => (
            <Table.Tr
              key={account.id}
              // onClick={() => onRowClick(account)}
              style={{ cursor: "pointer" }}
            >
              <Table.Td>{startIndex + index}</Table.Td>
              <Table.Td>{account.code}</Table.Td>
              <Table.Td>{account.name}</Table.Td>
              {/* <Table.Td>{account.type}</Table.Td> */}
              <Table.Td>{account.category}</Table.Td>
              <Table.Td>{account.description}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
