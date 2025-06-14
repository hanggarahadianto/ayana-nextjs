"use client";

import { Paper, Card, Text, Group, Flex, Grid, Stack, Divider } from "@mantine/core";

import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import { ExpenseStats } from "../../../common/stats/ExpenseStats";
import LoadingGlobal from "@/styles/loading/loading-global";
import { OutstandingDebtStats } from "@/components/common/stats/OutstandingDebtStats";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import GlobalTab from "@/components/common/tab/TabGlobal";
import { FixedAssetStats } from "@/components/common/stats/FixedAssetStats";
import { CashinStats } from "@/components/common/stats/CashInStats";
import { IoCashOutline } from "react-icons/io5";
import { AvailableCashStats } from "@/components/common/stats/AvailableCashStats";
import { CashOutStats } from "@/components/common/stats/CashOutStats";
import { ReceivableAssetStats } from "@/components/common/stats/ReceivableAssetStats";
import { RevenueStats } from "@/components/common/stats/RenevueStats";
import { useState } from "react";
import { formatCurrency } from "@/helper/formatCurrency";
import { GetJournalEntryData } from "./journalEntryData";

export const DashboardComponent = () => {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const grossProfit = totalRevenue - totalExpense;

  return (
    <SimpleGridGlobal cols={1}>
      <LoadingGlobal visible={isLoadingCompanies} />
      <GlobalTab data={companies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />

      <Grid>
        <Grid.Col span={6}>
          <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: "100%", gap: 20 }}>
            <Group p={40} justify="space-between" align="center">
              <Group>
                <IoCashOutline size={48} color="#228be6" />
                <Text size="32px" fw={700}>
                  Asset
                </Text>
              </Group>

              <Stack gap={4} align="end">
                <Text size="sm" c="dimmed" fw={500}>
                  Gross Profit
                </Text>
                <Text size="24px" fw={700} c={grossProfit >= 0 ? "green" : "red"}>
                  {formatCurrency(grossProfit)}
                </Text>
              </Stack>
            </Group>

            <Paper shadow="sm" radius="md" p="md" withBorder>
              <AvailableCashStats companyId={activeTab?.id} />
            </Paper>

            <Flex gap={"12px"}>
              <Paper shadow="sm" radius="md" p="md" withBorder w="100%">
                <CashinStats companyId={activeTab?.id} assetType="cashin" category="Kas & Bank" />
              </Paper>

              <Paper shadow="sm" radius="md" p="md" withBorder w="100%">
                <CashOutStats companyId={activeTab?.id} assetType="cashout" />
              </Paper>
            </Flex>

            <Paper shadow="sm" radius="md" p="md" withBorder>
              <ReceivableAssetStats companyId={activeTab?.id} />
            </Paper>
            <Paper shadow="sm" radius="md" p="md" withBorder>
              <FixedAssetStats companyId={activeTab?.id} />
            </Paper>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper shadow="sm" radius="md" p="md" withBorder>
            <Stack gap={20}>
              <Card>
                <RevenueStats companyId={activeTab?.id} onLoaded={(val) => setTotalRevenue(val)} />
              </Card>
              <Card>
                <ExpenseStats companyId={activeTab?.id} onLoaded={(val) => setTotalExpense(val)} />
              </Card>
              <Card mt={20}>
                <OutstandingDebtStats companyId={activeTab?.id} />
              </Card>
            </Stack>
          </Paper>
          <Flex gap={"12px"}>
            <Paper shadow="sm" radius="md" p="md" withBorder w="100%">
              <CashinStats companyId={activeTab?.id} assetType="cashin" category="Kas & Bank" />
            </Paper>

            <Paper shadow="sm" radius="md" p="md" withBorder w="100%">
              <CashOutStats companyId={activeTab?.id} assetType="cashout" />
            </Paper>
          </Flex>
        </Grid.Col>
      </Grid>
      <Divider mt={12} />
      <GetJournalEntryData companyId={activeTab?.id ?? ""} title="Transaksi" />
    </SimpleGridGlobal>
  );
};
