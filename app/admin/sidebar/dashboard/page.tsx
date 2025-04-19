"use client";

import { useState, useEffect } from "react";
import { SimpleGrid, Tabs } from "@mantine/core";

import useGetCompanies from "@/components/page/admin/company/GetCompanyTab";
import { ExpenseCard } from "@/components/page/admin/dashboard/ExpenseCard";
import UseCompanyTabs from "@/components/common/tab/CompanyTab";
import { OutstandingDebtCard } from "@/components/page/admin/finance/OutstandingDebit/OutstandingDebtCard";
import { CashSummaryCard } from "@/components/page/admin/dashboard/CashSummaryCard";
// import { ExpenseCard } from "@/components/page/admin/dashboard/ExpenseCard";

export default function Dashboard() {
  const { companies, activeTab, handleTabChange } = UseCompanyTabs();
  console.log("active", activeTab);

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
      </Tabs>
      <SimpleGrid p={20}>
        {/* <ExpenseCard companyId={activeTab?.id} />
         */}
        <OutstandingDebtCard companyId={activeTab?.id ?? ""} companyName={activeTab?.title} />
        <CashSummaryCard companyId={activeTab?.id ?? ""} />
      </SimpleGrid>
    </SimpleGrid>
  );
}
