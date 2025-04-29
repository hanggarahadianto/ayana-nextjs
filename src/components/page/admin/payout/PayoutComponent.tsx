"use client";

import { SimpleGrid, Stack, Tabs, Grid } from "@mantine/core";
import CreateJournalEntryModal from "@/components/page/admin/finance/journalEntry/CreateJournalEntryModal";
import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import { GetExpenseSummaryData } from "@/components/page/admin/finance/expense/GetExpenseSummayData";
import { GetOutstandingDebtData } from "../finance/outstandingDebt/GetOutstandingDebtData";

export default function PayoutComponent() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs(); // Use the custom hook

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

        {companies.map((company: ICompany) => (
          <Tabs.Panel key={company.company_code} value={company.company_code}>
            <Stack p={12} justify="flex-end" align="flex-end" style={{ width: "100%" }}></Stack>
          </Tabs.Panel>
        ))}
      </Tabs>
      <SimpleGrid p={20}>
        <Grid p={20} gutter="md">
          <GetExpenseSummaryData companyId={activeTab?.id} companyName={activeTab?.title} />

          <SimpleGrid mt={20}>
            <GetOutstandingDebtData companyId={activeTab?.id} companyName={activeTab?.title} />
          </SimpleGrid>
        </Grid>
      </SimpleGrid>
    </SimpleGrid>
  );
}
