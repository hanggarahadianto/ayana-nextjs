"use client";

import { Flex, Grid, Group, SimpleGrid, Tabs, Text } from "@mantine/core";
import UseCompanyTabs from "@/components/common/tab/TabCompany";
import { GetDashboardData } from "./CashSummaryCard";
import { useQuery } from "@tanstack/react-query";
import { getCashSummary } from "@/api/finance/getCashSummary";
import { formatCurrency } from "@/utils/formatCurrency";
import { CashInStats } from "./CashInStats";
import { ExpenseStats } from "./ExpenseStats";
import { useState } from "react";
import { AvaialbleCashStats } from "./AvailableCashStats";

export const DashboardComponent = () => {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs(); // Use the custom hook

  const transactionType = "payin";

  // Fungsi untuk mengambil data dari cache

  // const { data: summaryOnlyData, isPending: isLoadingSummary } = useQuery({
  //   queryKey: ["getSummaryOnlyData", activeTab?.id],
  //   queryFn: () => getCashSummary(activeTab?.id || "", 1, 10, "", true), // ✅ summaryOnly = true
  //   enabled: !!activeTab?.id,
  //   refetchOnWindowFocus: false,
  // });

  // console.log("summaryOnlyData", summaryOnlyData);
  const [cashInTotal, setCashInTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);

  const handleCashInChange = (newCashInTotal: number | null | undefined) => {
    // Jika data kosong (null atau undefined), setel ke 0
    setCashInTotal(newCashInTotal ?? 0);
  };

  const handleExpenseChange = (newExpenseTotal: number | null | undefined) => {
    // Jika data kosong (null atau undefined), setel ke 0
    setExpenseTotal(newExpenseTotal ?? 0);
  };

  const availableCash = cashInTotal - expenseTotal;

  return (
    <SimpleGrid mt={10}>
      <Tabs
        value={activeTab?.company_code}
        onChange={(value: string | null) => {
          const selectedCompany = companies.find((company) => company.company_code === value);
          if (selectedCompany) {
            handleTabChange(selectedCompany);
          }
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

      <Grid>
        {/* <Text>{formatCurrency(summaryOnlyData?.data.total_cashin ?? 0)}</Text>
         */}
        <Flex>
          <AvaialbleCashStats data={availableCash} />

          <CashInStats companyId={activeTab?.id} onCashInChange={handleCashInChange} />
          <ExpenseStats companyId={activeTab?.id} onExpenseChange={handleExpenseChange} />
        </Flex>
      </Grid>
      <GetDashboardData companyId={activeTab?.id ?? ""} />
    </SimpleGrid>
  );
};
