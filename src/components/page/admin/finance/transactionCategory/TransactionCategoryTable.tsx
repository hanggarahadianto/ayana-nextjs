import { Group, ScrollArea, Table, ThemeIcon } from "@mantine/core";

interface TransactionCategoryTableProps {
  data: ITransactionCategory[];
  onRowClick?: (TransactionCategory: ITransactionCategory) => void;
  onDelete?: (id: string) => void;
  refetchTransactionCategoryData?: () => void;
  startIndex?: number;
}

export default function TransactionCategoryTable({
  data,
  onRowClick,
  onDelete,
  refetchTransactionCategoryData,
  startIndex = 1,
}: TransactionCategoryTableProps) {
  // console.log("data TransactionCategory table", data);
  return (
    <ScrollArea style={{ minHeight: 400 }}>
      <Table
        highlightOnHover
        withColumnBorders
        style={{
          tableLayout: "fixed",
          width: "100%",
          minWidth: 700, // atau sesuai kebutuhan
          maxWidth: "100%",
        }}
      >
        <Table.Thead>
          <Table.Tr>
            {/* <Table.Th style={{ textAlign: "center", width: 80, minWidth: 80 }}>Code</Table.Th> */}
            <Table.Th style={{ textAlign: "center", width: 10, minWidth: 10 }}>No</Table.Th>

            <Table.Th style={{ textAlign: "center", width: 120, minWidth: 120 }}>Nama</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 100, minWidth: 100 }}>Kategori</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 100, minWidth: 100 }}>Debit</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 100, minWidth: 100 }}>Kredit</Table.Th>
            <Table.Th style={{ textAlign: "center", width: 180, minWidth: 180 }}>Deskripsi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((TransactionCategory: ITransactionCategory, index: number) => (
            <Table.Tr
              key={TransactionCategory.id}
              // onClick={() => onRowClick(TransactionCategory)}
              style={{ cursor: "pointer" }}
            >
              {/* <Table.Td>{TransactionCategory.code}</Table.Td> */}
              <Table.Td>{startIndex + index}</Table.Td>
              <Table.Td>{TransactionCategory.name}</Table.Td>
              {/* <Table.Td>{TransactionCategory.type}</Table.Td> */}
              <Table.Td>{TransactionCategory.category}</Table.Td>
              <Table.Td>{TransactionCategory.debit_account_type}</Table.Td>
              <Table.Td>{TransactionCategory.credit_account.type}</Table.Td>
              <Table.Td>{TransactionCategory.description}</Table.Td>
              {/* <Table.Td style={{ textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
                <Group ml={4}>
                  <PayTransactionCategoryButton TransactionCategory={TransactionCategory} refetchTransactionCategoryData={refetchTransactionCategoryData} />
                  <EditTransactionCategoryModal TransactionCategory={TransactionCategory} refetchTransactionCategoryData={refetchTransactionCategoryData} />
                  <ButtonDeleteWithConfirmation
                    id={TransactionCategory.id}
                    onDelete={onDelete}
                    description={`Apakah Anda yakin ingin menghapus invoice ${TransactionCategory.invoice}?`}
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
