import React, { useState } from "react";
import { Modal, Paper, Text, ScrollArea, Flex, Group, Badge, Stack, Table, Grid, Progress, Tooltip, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye, IconPlus } from "@tabler/icons-react";
import BreathingActionIcon from "@/components/button/buttonAction";
import { useQuery } from "@tanstack/react-query";
import { getDataGoods } from "@/api/good/getDataGoods";
import CashFlowReportTable from "./CashFlowReportTable";

const GetCashFlowReportModal = ({
  projectName,
  cashFlowData,
  totalCost,
}: {
  projectName: any;
  cashFlowData: ICashFlow[];

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

  const {
    data: goodsData,
    isLoading: isLoadingGoodsdata,
    refetch: refetchGoodsData,
  } = useQuery({
    queryKey: ["getGoodsData", cashFlowData], // Query key berubah agar refetch bekerja dengan baik
    queryFn: () => getDataGoods(cashFlowData), // Kirim seluruh `cashFlowData` sebagai array
    enabled: cashFlowData.length > 0, // Hanya jalankan jika ada data
    refetchOnWindowFocus: false,
  });

  const calculateWeeklyPercentage = (week: string) => {
    const weekTotal = groupedByWeek[week].reduce((sum: number, row: any) => sum + row.cash_out, 0);
    return (weekTotal / totalCost) * 100;
  };

  const calculateWeeklyCashOut = (week: string) => {
    return groupedByWeek[week].reduce((sum: number, row: any) => sum + row.cash_out, 0);
  };

  // Gabungkan cashFlowData dengan goodsData berdasarkan ID
  const mergedData = cashFlowData.map((row: ICashFlow) => {
    const matchedGoods = goodsData
      ?.flatMap((data) => data.data) // Ambil data barang dari array `data`
      .filter((good) => good.cash_flow_id === row.id); // Cocokkan dengan cashFlowData.id

    return { ...row, goods: matchedGoods };
  });

  // console.log("Merged Data:", mergedData);

  return (
    <>
      <BreathingActionIcon
        onClick={open}
        size="2.5rem"
        icon={<IconEye size="1.5rem" />}
        gradient="linear-gradient(135deg, #D8B4FE, #E9D5FF)"
      />

      <Modal
        opened={opened}
        onClose={close}
        size={"100%"}
        yOffset="100px" // Moves modal down
      >
        <Paper p="md" shadow="sm" mb={16}>
          <Grid>
            <Grid.Col span={2} mr={40}>
              <Stack>
                <Text>BUKU KAS UMUM</Text>
                <Text size="lg" fw={700} mb="sm">
                  {`${projectName}`}
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={9}>
              <Group mt="md" gap="sm">
                {/*  */}
                <Stack>
                  <Text size="xl" fw={900} c="blue">
                    Alur Pengeluaran
                  </Text>
                  <Progress.Root size={40} w={800}>
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

          <CashFlowReportTable groupedByWeek={groupedByWeek} mergedData={mergedData} />
        </Paper>
      </Modal>
    </>
  );
};

export default GetCashFlowReportModal;
