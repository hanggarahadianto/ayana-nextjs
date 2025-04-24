"use client";

import { Tabs, Paper } from "@mantine/core";
import { useState } from "react";

import UseCompanyTabs from "@/components/common/tab/TabCompany";
import { GetDashboardData } from "./CashSummaryCard";
import { CashInStats } from "../../../common/stats/CashInStats";
import { ExpenseStats } from "../../../common/stats/ExpenseStats";
import { AvaialbleCashStats } from "../../../common/stats/AvailableCashStats";
import LoadingGlobal from "@/styles/loading/loading-global";
import { OutstandingDebtStats } from "@/components/common/stats/OutstandingDebtStats";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";

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

  const availableCash = cashInTotal - expenseTotal;

  return (
    <SimpleGridGlobal cols={1}>
      <LoadingGlobal visible={isLoadingCompanies} />

      <Tabs
        value={activeTab?.company_code}
        onChange={(value: string | null) => {
          const selectedCompany = companies.find((c) => c.company_code === value);
          if (selectedCompany) handleTabChange(selectedCompany);
        }}
      >
        <Tabs.List>
          {companies.map((company) => (
            <Tabs.Tab key={company.company_code} value={company.company_code}>
              {company.title}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      <SimpleGridGlobal>
        <Paper shadow="sm" radius="md" p="md" withBorder>
          <AvaialbleCashStats data={availableCash} />
        </Paper>
        <Paper shadow="sm" radius="md" p="md" withBorder>
          <CashInStats companyId={activeTab?.id} onCashInChange={handleCashInChange} />
        </Paper>
        <Paper shadow="sm" radius="md" p="md" withBorder>
          <ExpenseStats companyId={activeTab?.id} onExpenseChange={handleExpenseChange} />
        </Paper>
        <Paper shadow="sm" radius="md" p="md" withBorder>
          <OutstandingDebtStats companyId={activeTab?.id} />
        </Paper>
      </SimpleGridGlobal>

      <Paper shadow="sm" radius="md" p="md" withBorder>
        <GetDashboardData companyId={activeTab?.id ?? ""} />
      </Paper>
    </SimpleGridGlobal>
  );
};
