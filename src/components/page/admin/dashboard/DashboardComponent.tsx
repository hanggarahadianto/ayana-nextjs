"use client";

import { Tabs, Paper, Card, Text, Group, Flex, Grid } from "@mantine/core";
import { useState } from "react";

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

export const DashboardComponent = () => {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs();

  return (
    <SimpleGridGlobal cols={1}>
      <LoadingGlobal visible={isLoadingCompanies} />

      <GlobalTab data={companies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />

      <Grid>
        <Grid.Col span={6}>
          <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: "100%", gap: 20 }}>
            <Group p={40}>
              <IoCashOutline size={"40px"} />
              <Text size="40px" fw={700}>
                Asset
              </Text>
            </Group>

            <Paper shadow="sm" radius="md" p="md" withBorder>
              <AvailableCashStats companyId={activeTab?.id} />
            </Paper>

            <Flex>
              <Paper shadow="sm" radius="md" p="md" withBorder w="100%">
                <CashinStats companyId={activeTab?.id} />
              </Paper>

              <Paper shadow="sm" radius="md" p="md" withBorder w="100%">
                <CashOutStats companyId={activeTab?.id} />
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
            <Card>
              <ExpenseStats companyId={activeTab?.id} />
            </Card>
            <Card mt={20}>
              <OutstandingDebtStats companyId={activeTab?.id} />
            </Card>
          </Paper>
        </Grid.Col>
      </Grid>
    </SimpleGridGlobal>
  );
};
