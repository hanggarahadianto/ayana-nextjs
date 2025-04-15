import { Group, ScrollArea, Table, ThemeIcon } from "@mantine/core";

interface AccountTableProps {
  data: IAccount[];
  onRowClick?: (account: IAccount) => void;
  onDelete?: (id: string) => void;
  refetchAccountData?: () => void;
}

export default function AccountTable({ data, onRowClick, onDelete, refetchAccountData }: AccountTableProps) {
  console.log("data account table", data);
  return (
    <ScrollArea>
      <Table
        highlightOnHover
        withColumnBorders
        style={{
          tableLayout: "fixed", // ⛔ penting untuk ukuran kolom tetap
          width: "100%",
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: "center", width: "80px" }}>Code</Table.Th>
            <Table.Th style={{ textAlign: "center", width: "120px" }}>Nama</Table.Th>
            {/* <Table.Th style={{ textAlign: "center", width: "160px" }}>Tipe</Table.Th> */}
            <Table.Th style={{ textAlign: "center", width: "100px" }}>Kategori</Table.Th>
            <Table.Th style={{ textAlign: "center", width: "180px" }}>Deskripsi</Table.Th>
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
