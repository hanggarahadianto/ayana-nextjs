"use client";
import { useState, useEffect } from "react";
import { Grid, Paper, SimpleGrid, Stack, Tabs } from "@mantine/core";

import { TransactionCategoryCard } from "@/components/page/admin/finance/transactionCategory/TransactionCategoryCard";
import { AccountCard } from "@/components/page/admin/finance/account/GetAccountData";
import UseCompanyTabs from "@/components/common/tab/TabCompany";
import LoadingGlobal from "@/styles/loading/loading-global";

export default function Finance() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs(); // Use the custom hook

  return (
    <SimpleGrid mt={10}>
      <LoadingGlobal visible={isLoadingCompanies} />
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
          {companies.map((company: ICompany) => (
            <Tabs.Tab key={company.company_code} value={company.company_code}>
              {company.title}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Grid p={20}>
          <Grid.Col span={6}></Grid.Col>
          <Grid.Col span={6}></Grid.Col>
          <SimpleGrid mb={20}>
            <TransactionCategoryCard companyId={activeTab?.id || ""} companyName={activeTab?.title} />
          </SimpleGrid>

          <AccountCard companyId={activeTab?.id || ""} companyName={activeTab?.title} />
        </Grid>
      </Tabs>
    </SimpleGrid>
  );
}
