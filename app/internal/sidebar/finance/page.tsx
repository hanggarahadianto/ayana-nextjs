"use client";

import { useState, useEffect } from "react";
import { SimpleGrid, Tabs } from "@mantine/core";

import useGetCompanies from "@/components/internal/sidebar/company/GetCompanyTab";
import { ExpenseCard } from "@/components/internal/sidebar/dashboard/ExpenseCard";
import AddInvestmetn from "@/components/internal/sidebar/finance/investment/AddInvestmentModal";
import AddInvestment from "@/components/internal/sidebar/finance/investment/AddInvestmentModal";
import { InvestmentCard } from "@/components/internal/sidebar/finance/investment/InvestmentCard";

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
      </Tabs>
      <SimpleGrid p={20}>
        <InvestmentCard companyId={undefined} />
      </SimpleGrid>
    </SimpleGrid>
  );
}
