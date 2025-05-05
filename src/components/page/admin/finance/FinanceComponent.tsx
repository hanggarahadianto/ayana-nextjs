"use client";

import { Card, Grid, Paper, SimpleGrid, Tabs } from "@mantine/core";
import { TransactionCategoryCard } from "@/components/page/admin/finance/transactionCategory/TransactionCategoryCard";
import { AccountCard } from "@/components/page/admin/finance/account/GetAccountData";
import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import LoadingGlobal from "@/styles/loading/loading-global";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import GlobalTab from "@/components/common/tab/TabGlobal";

export default function FinanceComponent() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs(); // Use the custom hook

  return (
    <SimpleGridGlobal cols={1}>
      <LoadingGlobal visible={isLoadingCompanies} />

      <GlobalTab data={companies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />

      <SimpleGridGlobal cols={1} mt={20}>
        <Paper shadow="sm" radius="md" p="md" withBorder>
          <Card>
            <TransactionCategoryCard companyId={activeTab?.id || ""} companyName={activeTab?.title} />
          </Card>
          <Card mt={20}>
            <AccountCard companyId={activeTab?.id || ""} companyName={activeTab?.title} />
          </Card>
        </Paper>
      </SimpleGridGlobal>
    </SimpleGridGlobal>
  );
}
