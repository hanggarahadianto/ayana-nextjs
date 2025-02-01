import React, { useState } from "react";
import {
  Modal,
  ActionIcon,
  Paper,
  Text,
  ScrollArea,
  Flex,
  Group,
  Badge,
  Stack,
  Table,
  Grid,
  Progress,
  Tooltip,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconPlus } from "@tabler/icons-react";

const GetCashFlowReportModal = ({
  projectName,
  cashFlowData,
  refetchWeeklyProgressData,
  totalCost,
}: {
  projectName: any;
  cashFlowData: ICashFlow[];
  refetchWeeklyProgressData: () => void;
  totalCost: any;
}) => {
  console.log("total Cost", totalCost);
  const [opened, { open, close }] = useDisclosure(false);

  const groupedByWeek = cashFlowData.reduce((acc: any, item: any) => {
    if (!acc[item.week_number]) {
      acc[item.week_number] = [];
    }
    acc[item.week_number].push(item);
    return acc;
  }, {});

  const calculateTotals = () => {
    return cashFlowData.reduce(
      (totals, row) => {
        totals.cashIn += row.cash_in;
        totals.cashOut += row.cash_out;
        totals.balance = totals.cashIn - totals.cashOut;
        return totals;
      },
      { cashIn: 0, cashOut: 0, balance: 0 }
    );
  };

  const { cashIn, cashOut, balance } = calculateTotals();

  const calculateWeeklyPercentage = (week: string) => {
    const weekTotal = groupedByWeek[week].reduce((sum: number, row: any) => sum + row.cash_out, 0);
    return (weekTotal / totalCost) * 100;
  };

  const calculateWeeklyCashOut = (week: string) => {
    return groupedByWeek[week].reduce((sum: number, row: any) => sum + row.cash_out, 0);
  };

  return (
    <>
      <ActionIcon variant="white" size="lg" onClick={open}>
        <IconEye size="1.5rem" />
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={close}
        size={"100%"}
        yOffset="100px" // Moves modal down
      >
        <Paper p="md" shadow="sm" mb={16}>
          <Grid>
            <Grid.Col span={4}>
              <Text size="lg" fw={700} mb="sm">
                {`BUKU KAS UMUM - ${projectName}`}
              </Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Group mt="md" gap="sm">
                {/*  */}
                <Stack>
                  <Text size="xl" fw={900} color="blue">
                    Alur Pengeluaran
                  </Text>
                  <Progress.Root size={40} w={1000}>
                    {Object.keys(groupedByWeek).map((week, index) => {
                      const weekTotal = calculateWeeklyCashOut(week);
                      const weekPercentage = calculateWeeklyPercentage(week);

                      return (
                        <Tooltip key={week} label={`Minggu Ke ${week}: Rp ${weekTotal.toLocaleString()}`}>
                          <Progress.Section
                            value={weekPercentage}
                            color={["cyan", "pink", "orange", "blue", "green", "red", "purple", "yellow"][index % 8]}
                          >
                            <Progress.Label>{`${week}`}</Progress.Label>
                          </Progress.Section>
                        </Tooltip>
                      );
                    })}
                  </Progress.Root>
                </Stack>
                <Stack justify="end" align="end" w="100%" mb={40}>
                  <Grid w={400}>
                    <Grid.Col span={6}>
                      <Text size="md">💰 Uang Masuk</Text>
                      <Text size="md">💸 Uang Keluar</Text>
                      <Text size="md" fw={700} c={balance < 0 ? "red" : "green"}>
                        🔹 Uang Tersisa
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text> : Rp {cashIn.toLocaleString()}</Text>
                      <Text> : Rp {cashOut.toLocaleString()}</Text>
                      <Text c={balance < 0 ? "red" : "green"}> : Rp {balance.toLocaleString()}</Text>
                    </Grid.Col>
                  </Grid>
                </Stack>

                {/*  */}
              </Group>
            </Grid.Col>
          </Grid>

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

                      const tableTitle = (
                        <Table.Tr>
                          <Table.Th style={{ width: "25%" }}>PENGELUARAN</Table.Th>
                          <Table.Th style={{ width: "25%" }}>KUANTITAS</Table.Th>
                          <Table.Th style={{ width: "25%" }}>STATUS</Table.Th>
                          <Table.Th style={{ width: "25%" }}>TOTAL</Table.Th>
                        </Table.Tr>
                      );

                      // Define table rows
                      const rows = row.good.map((good: IGoods, index: number) => (
                        <Table.Tr key={`${row.id}-${index}`}>
                          <Table.Td>
                            <Text variant="outline">{good.good_name}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Text variant="outline">{good.quantity}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Text variant="outline">{good.status.charAt(0).toUpperCase() + good.status.slice(1)}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Text variant="outline">{good.total_cost.toLocaleString()}</Text>
                          </Table.Td>
                        </Table.Tr>
                      ));

                      return (
                        <div key={week}>
                          <Divider mt={20} />

                          <Table key={row.id} highlightOnHover withTableBorder withColumnBorders>
                            <Table.Thead>{tableTitle}</Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                          </Table>
                          <Group justify="space-between">
                            <Text></Text>
                            <Flex direction="column" gap="sm" mt="sm">
                              <Text size="md">💰 Uang Masuk: Rp {row.cash_in.toLocaleString()}</Text>
                              <Text size="md">💸 Uang Keluar: Rp {row.cash_out.toLocaleString()}</Text>
                              <Text size="md" fw={700} c={balance < 0 ? "red" : "green"}>
                                🔹 Uang Tersisa: Rp {balance.toLocaleString()}
                              </Text>
                            </Flex>
                          </Group>
                        </div>
                      );
                    })}
                  </Flex>
                </div>
              ))}
            </Flex>
          </ScrollArea>
        </Paper>
      </Modal>
    </>
  );
};

export default GetCashFlowReportModal;
