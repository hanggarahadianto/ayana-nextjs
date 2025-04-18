import { Group, ScrollArea, Table, ThemeIcon } from "@mantine/core";

interface AccountTableProps {
  data: IAccount[];
  onRowClick?: (account: IAccount) => void;
  onDelete?: (id: string) => void;
  refetchAccountData?: () => void;
}

export default function AccountTable({ data, onRowClick, onDelete, refetchAccountData }: AccountTableProps) {
  // console.log("data account table", data);
  return (
    <ScrollArea style={{ minHeight: 400 }}>
      <Table
        px={100}
        highlightOnHover
        withColumnBorders
        style={{
          padding: 100,
          tableLayout: "fixed",
          width: "100%",
          minWidth: 700, // atau sesuai kebutuhan
          maxWidth: "100%",
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: "center", width: 30, minWidth: 30 }}>Code</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 120, minWidth: 120 }}>Nama</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 140, minWidth: 140 }}>Kategori</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 180, minWidth: 180 }}>Deskripsi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((account: IAccount) => (
            <Table.Tr
              key={account.id}
              // onClick={() => onRowClick(account)}
              style={{ cursor: "pointer" }}
            >
              <Table.Td>{account.code}</Table.Td>
              <Table.Td>{account.name}</Table.Td>
              {/* <Table.Td>{account.type}</Table.Td> */}
              <Table.Td>{account.category}</Table.Td>
              <Table.Td>{account.description}</Table.Td>
              {/* <Table.Td style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                <Group ml={4}>
                  <PayaccountButton account={account} refetchaccountData={refetchaccountData} />
                  <EditaccountModal account={account} refetchaccountData={refetchaccountData} />
                  <ButtonDeleteWithConfirmation
                    id={account.id}
                    onDelete={onDelete}
                    description={`Apakah Anda yakin ingin menghapus invoice ${account.invoice}?`}
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
