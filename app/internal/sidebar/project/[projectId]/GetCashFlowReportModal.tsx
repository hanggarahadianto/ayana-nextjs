import React, { useState } from "react";
import { Modal, ActionIcon, Paper, Text, ScrollArea, Flex, Group, Badge, Stack, Table, Grid, Progress, Tooltip } from "@mantine/core";
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
  const [opened, { open, close }] = useDisclosure(false);

  const groupedByWeek = cashFlowData.reduce((acc: any, item: any) => {
    if (!acc[item.week_number]) {
      acc[item.week_number] = [];
    }
    acc[item.week_number].push(item);
    return acc;
  }, {});

  const calculateProgress = (weekNumber: number) => {
    let totalBalance = 0;

    // Sum up cash_in - cash_out for each week up to the current week
    for (let i = 1; i <= weekNumber; i++) {
      const weekData = groupedByWeek[i];
      if (weekData) {
        weekData.forEach((row: any) => {
          const balance = row.cash_in - row.cash_out;
          totalBalance += balance;
        });
      }
    }

    // Calculate progress percentage (current balance / total cost)
    const progress = Math.min((totalBalance / totalCost) * 100, 100); // Ensure it doesn't exceed 100%
    return progress;
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
            <Grid.Col span={6}>
              <Text size="lg" fw={700} mb="sm">
                {`BUKU KAS UMUM - ${projectName}`}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              {Object.keys(groupedByWeek).map((week) => (
                <Progress.Root key={week} size={40}>
                  <Tooltip label={`Minggu Ke - ${week}`}>
                    <Progress.Section value={calculateProgress(Number(week))} color="cyan">
                      <Progress.Label>Minggu Ke {week}</Progress.Label>
                    </Progress.Section>
                  </Tooltip>
                </Progress.Root>
              ))}
            </Grid.Col>
          </Grid>

          <ScrollArea>
            <Flex direction="column" gap="lg">
              {Object.keys(groupedByWeek).map((week) => (
                <div key={week}>
                  <Text size="xl" fw={600} color="blue" mb="sm">
                    Minggu Ke {week}
                  </Text>

                  <Flex direction="column" gap="sm">
                    {groupedByWeek[week].map((row: any) => {
                      const balance = row.cash_in - row.cash_out;

                      const tableTitle = (
                        <Table.Tr>
                          <Table.Th style={{ width: "25%" }}>Pengeluaran</Table.Th>
                          <Table.Th style={{ width: "25%" }}>Kuantitas</Table.Th>
                          <Table.Th style={{ width: "25%" }}>Status</Table.Th>
                          <Table.Th style={{ width: "25%" }}>Total</Table.Th>
                        </Table.Tr>
                      );

                      // Define table rows
                      const rows = row.good.map((good: IGoods, index: number) => (
                        <Table.Tr key={`${row.id}-${index}`}>
                          <Table.Td>
                            <Text c="white" variant="outline">
                              {good.good_name}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Text c="white" variant="outline">
                              {good.quantity}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Text c="white" variant="outline">
                              {good.status.charAt(0).toUpperCase() + good.status.slice(1)}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Text c="white" variant="outline">
                              {good.total_cost.toLocaleString()}
                            </Text>
                          </Table.Td>
                        </Table.Tr>
                      ));

                      return (
                        <div key={week}>
                          <Table key={row.id} highlightOnHover withTableBorder withColumnBorders>
                            <Table.Thead>{tableTitle}</Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                          </Table>
                          <Group justify="space-between">
                            <Text>Laporan Keuangan</Text>
                            <Flex direction="column" gap="sm" mt="sm">
                              <Text size="md">💰 Cash In: Rp {row.cash_in.toLocaleString()}</Text>
                              <Text size="md">💸 Cash Out: Rp {row.cash_out.toLocaleString()}</Text>
                              <Text size="md" fw={700} c={balance < 0 ? "red" : "green"}>
                                🔹 Account Balance: Rp {balance.toLocaleString()}
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
