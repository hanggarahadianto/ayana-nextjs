"use client";

import { useState } from "react";
import { SimpleGrid, Tabs } from "@mantine/core";
import UseCompanyTabs from "@/components/common/tab/CompanyTab";
import { GetDashboardData } from "./CashSummaryCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const DashboardAdminComponent = () => {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs(); // Use the custom hook

  const transactionType = "payin";

  // Fungsi untuk mengambil data dari cache

  // const {
  //   data: cashSummaryData,
  //   isPending: isLoadingCashSummaryData,
  //   refetch: refetchCashSummaryData,
  // } = useQuery({
  //   queryKey: ["getCashSummaryData", companyId, page],
  //   queryFn: () => getCashSummary(companyId, page, limit, transactionType),
  //   enabled: !!companyId,
  //   refetchOnWindowFocus: false,
  // });

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

      <SimpleGrid p={20}>
        <GetDashboardData companyId={activeTab?.id ?? ""} />
      </SimpleGrid>
    </SimpleGrid>
  );
};
