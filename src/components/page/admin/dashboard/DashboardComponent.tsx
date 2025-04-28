"use client";

import { Tabs, Paper, Card, Text, Group } from "@mantine/core";
import { useState } from "react";

import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import { ExpenseStats } from "../../../common/stats/ExpenseStats";
import { AvaialbleCashStats } from "../../../common/stats/AvailableCashStats";
import LoadingGlobal from "@/styles/loading/loading-global";
import { OutstandingDebtStats } from "@/components/common/stats/OutstandingDebtStats";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import GlobalTab from "@/components/common/tab/TabGlobal";
import { FixedAssetStats } from "@/components/common/stats/FixedAssetStats";
import { CashinStats } from "@/components/common/stats/CashInStats";
import { IoCashOutline } from "react-icons/io5";

export const DashboardComponent = () => {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs();

  const [cashInTotal, setCashInTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [assetTotal, setAssetTotal] = useState(0);

  const handleCashInChange = (newCashInTotal: number | null | undefined) => {
    setCashInTotal(newCashInTotal ?? 0);
  };

  const handleExpenseChange = (newExpenseTotal: number | null | undefined) => {
    setExpenseTotal(newExpenseTotal ?? 0);
  };
  const handleAssetChange = (newAssetTotal: number | null | undefined) => {
    setAssetTotal(newAssetTotal ?? 0);
  };

  const availableCash = cashInTotal - expenseTotal - assetTotal;

  return (
    <SimpleGridGlobal cols={1}>
      <LoadingGlobal visible={isLoadingCompanies} />

      <GlobalTab data={companies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />

      <SimpleGridGlobal p={40} cols={2} mt={20}>
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: "100%", gap: 20 }}>
          <Group p={40}>
            <IoCashOutline size={"40px"} />
            <Text size="40px" fw={200}>
              Asset
            </Text>
          </Group>

          <Paper shadow="sm" radius="md" p="md" withBorder>
            <AvaialbleCashStats data={availableCash} />
          </Paper>

          <Paper shadow="sm" radius="md" p="md" withBorder>
            <CashinStats companyId={activeTab?.id} onCashInChange={handleCashInChange} />
          </Paper>
          <Paper shadow="sm" radius="md" p="md" withBorder>
            <FixedAssetStats companyId={activeTab?.id} onAssetChange={handleAssetChange} />
          </Paper>
        </Card>

        <Paper shadow="sm" radius="md" p="md" withBorder>
          <Card>
            <ExpenseStats companyId={activeTab?.id} onExpenseChange={handleExpenseChange} />
          </Card>
          <Card mt={20}>
            <OutstandingDebtStats companyId={activeTab?.id} />
          </Card>
        </Paper>
      </SimpleGridGlobal>
    </SimpleGridGlobal>
  );
};
