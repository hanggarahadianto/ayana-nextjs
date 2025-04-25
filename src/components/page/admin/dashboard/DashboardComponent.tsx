"use client";

import { Tabs, Paper } from "@mantine/core";
import { useState } from "react";

import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import { GetDashboardData } from "./CashSummaryCard";
import { CashInStats } from "../../../common/stats/CashInStats";
import { ExpenseStats } from "../../../common/stats/ExpenseStats";
import { AvaialbleCashStats } from "../../../common/stats/AvailableCashStats";
import LoadingGlobal from "@/styles/loading/loading-global";
import { OutstandingDebtStats } from "@/components/common/stats/OutstandingDebtStats";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import GlobalTab from "@/components/common/tab/TabGlobal";

export const DashboardComponent = () => {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs();

  const [cashInTotal, setCashInTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  const handleCashInChange = (newCashInTotal: number | null | undefined) => {
    setCashInTotal(newCashInTotal ?? 0);
  };

  const handleExpenseChange = (newExpenseTotal: number | null | undefined) => {
    setExpenseTotal(newExpenseTotal ?? 0);
  };

  console.log("Cash In Total:", cashInTotal);
  console.log("Expense Total:", expenseTotal);

  const availableCash = cashInTotal - expenseTotal;

  console.log("Available Cash:", availableCash);

  return (
    <SimpleGridGlobal cols={1}>
      <LoadingGlobal visible={isLoadingCompanies} />

      <GlobalTab data={companies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />

      <SimpleGridGlobal p={40}>
        <Paper shadow="sm" radius="md" p="md" withBorder>
          <AvaialbleCashStats data={availableCash} />
        </Paper>
        <Paper shadow="sm" radius="md" p="md" withBorder>
          <CashInStats companyId={activeTab?.id} onCashInChange={handleCashInChange} />
        </Paper>
        <Paper shadow="sm" radius="md" p="md" withBorder>
          <OutstandingDebtStats companyId={activeTab?.id} />
        </Paper>
        <Paper shadow="sm" radius="md" p="md" withBorder>
          <ExpenseStats companyId={activeTab?.id} onExpenseChange={handleExpenseChange} />
        </Paper>
      </SimpleGridGlobal>

      <Paper shadow="sm" radius="md" p="md" withBorder>
        <GetDashboardData companyId={activeTab?.id ?? ""} />
      </Paper>
    </SimpleGridGlobal>
  );
};
