"use client";

import { useState, useEffect } from "react";
import { SimpleGrid, Tabs } from "@mantine/core";

import useGetCompanies from "@/components/internal/sidebar/company/GetCompanyTab";
import { ExpenseCard } from "@/components/internal/sidebar/dashboard/ExpenseCard";

export default function Dashboard() {
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

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

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

        {/* {companies.map((company: ICompany) => (
          <Tabs.Panel key={company.company_code} value={company.company_code}>
            <Stack p={12} justify="flex-end" align="flex-end" style={{ width: "100%" }}>
              <AddPayoutModal refetchPayloadData={refetchPayoutData} companyCode={activeTab?.company_code} companyId={company?.id} />
            </Stack>
          </Tabs.Panel>
        ))} */}
      </Tabs>
      <SimpleGrid p={20}>
        <ExpenseCard companyId={activeTab?.id} />
      </SimpleGrid>
    </SimpleGrid>
  );
}
