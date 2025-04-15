import { formatCurrency } from "@/utils/formatCurrency";
import { ScrollArea, Flex, Divider, Text, Table, Stack, Grid } from "@mantine/core";

interface CashFlowReportTableProps {
  groupedByWeek: Record<string, any[]>; // Sesuaikan dengan tipe data sebenarnya
  mergedData: any[];
}

const CashFlowReportTable: React.FC<CashFlowReportTableProps> = ({ groupedByWeek, mergedData }) => {
  return (
    <ScrollArea>
      <Flex direction="column" gap="lg">
        {Object.keys(groupedByWeek).map((week) => (
          <div key={week}>
            <Divider p={20} />
            <Text size="xl" fw={800} c="blue" mb="sm">
              Minggu Ke {week}
            </Text>

            <Flex direction="column" gap="sm">
              {groupedByWeek[week].map((row: any) => {
                const balance = row.cash_in - row.cash_out;
                const goods = mergedData.find((data) => data.id === row.id)?.goods || [];

                return (
                  <div key={row.id}>
                    <Divider mt={20} />

                    {goods.length > 0 && (
                      <Table highlightOnHover withTableBorder withColumnBorders>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th style={{ width: "25%" }}>PENGELUARAN</Table.Th>
                            <Table.Th style={{ width: "6%" }}>KUANTITAS</Table.Th>
                            <Table.Th style={{ width: "10%" }}>SATUAN</Table.Th>
                            <Table.Th style={{ width: "12%" }}>HARGA</Table.Th>
                            <Table.Th style={{ width: "22%" }}>TOTAL</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {goods
                            .sort((a: { good_name: string }, b: { good_name: any }) => a.good_name.localeCompare(b.good_name))
                            .map((good: IGoods, index: number) => (
                              <Table.Tr key={`${row.id}-${index}`}>
                                <Table.Td>
                                  <Text variant="outline">{good.good_name}</Text>
                                </Table.Td>
                                <Table.Td>
                                  <Text variant="outline">{good.quantity}</Text>
                                </Table.Td>
                                <Table.Td>
                                  <Text variant="outline">{good.unit}</Text>
                                </Table.Td>
                                <Table.Td>
                                  <Text variant="outline">{formatCurrency(good.price)}</Text>
                                </Table.Td>
                                <Table.Td>
                                  <Text variant="outline">{formatCurrency(good.total_cost)}</Text>
                                </Table.Td>
                              </Table.Tr>
                            ))}
                        </Table.Tbody>
                      </Table>
                    )}

                    <Stack justify="end" align="end" p={10}>
                      <Grid w={400}>
                        <Grid.Col span={6}>
                          <Text size="md">💰 Uang Masuk</Text>
                          <Text size="md">💸 Uang Keluar</Text>
                          <Text size="md" fw={700} c={balance < 0 ? "red" : "green"}>
                            🔹 Uang Tersisa
                          </Text>
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <Text>: Rp {row.cash_in.toLocaleString()}</Text>
                          <Text>: Rp {row.cash_out.toLocaleString()}</Text>
                          <Text c={balance < 0 ? "red" : "green"}>: Rp {balance.toLocaleString()}</Text>
                        </Grid.Col>
                      </Grid>
                    </Stack>
                  </div>
                );
              })}
            </Flex>
          </div>
        ))}
      </Flex>
    </ScrollArea>
  );
};

export default CashFlowReportTable;
