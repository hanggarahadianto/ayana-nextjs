"use client";

import { useState, useEffect } from "react";
import { Grid, GridCol, SimpleGrid, Tabs } from "@mantine/core";

import useGetCompanies from "@/components/page/admin/company/GetCompanyTab";
// import { InvestmentCard } from "@/components/page/admin/finance/investment/InvestmentCard"
import { TransactionCategoryCard } from "@/components/page/admin/finance/transactionCategory/TransactionCategoryCard";
import { AccountCard } from "@/components/page/admin/finance/account/AccountCard";

export default function Finance() {
  const { companies, isLoading: isLoadingCompanies } = useGetCompanies();
  const [activeTab, setActiveTab] = useState<ICompany | null>(null);

  useEffect(() => {
    if (companies.length > 0 && !activeTab) {
      setActiveTab(companies[0]); // Set tab pertama sebagai default
    }
  }, [companies, activeTab]);

  const handleTabChange = (value: ICompany) => {
    console.log("VALUES", value);
    if (value) {
      setActiveTab(value);
    }
  };

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
          {companies.map((company: ICompany) => (
            <Tabs.Tab key={company.company_code} value={company.company_code}>
              {company.title}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Grid p={20}>
          <Grid.Col span={6}>
            <TransactionCategoryCard companyId={activeTab?.id || ""} companyName={activeTab?.title} />
          </Grid.Col>
          <Grid.Col span={6}>
            <AccountCard companyId={activeTab?.id || ""} companyName={activeTab?.title} />
          </Grid.Col>
        </Grid>
      </Tabs>
    </SimpleGrid>
  );
}
