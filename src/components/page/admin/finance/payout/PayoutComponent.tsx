"use client";

import { SimpleGrid, Stack, Tabs, Grid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CreateJournalEntryModal from "@/components/page/admin/finance/journalEntry/CreateJournalEntryModal";
import UseCompanyTabs from "@/components/common/tab/CompanyTab";
import { getExpenseSummary } from "@/api/finance/getExpenseSummary";
import { GetExpenseSummaryData } from "@/components/page/admin/finance/payout/GetExpenseSummayData";
import { OutstandingDebtCard } from "@/components/page/admin/finance/OutstandingDebit/OutstandingDebtCard";
import { getOutstandingDebt } from "@/api/finance/getOutstandingDebt";

export default function Payout() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs(); // Use the custom hook

  return (
    <SimpleGrid mt={10}>
      {/* <LoadingGlobal visible={isLoadingExpenseSummaryData || isLoadingOutstandingDebt} /> */}
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
            <Stack p={12} justify="flex-end" align="flex-end" style={{ width: "100%" }}>
              {/* <AddPayinModal companyCode={activeTab?.company_code} companyId={company?.id} />
               */}
              <CreateJournalEntryModal transactionType={"payout"} companyId={company?.id} />
            </Stack>
          </Tabs.Panel>
        ))}
      </Tabs>
      <SimpleGrid p={20}>
        <Grid p={20}>
          <Grid.Col span={5}>
            <GetExpenseSummaryData companyId={activeTab?.id} companyName={activeTab?.title} />
          </Grid.Col>
          <Grid.Col span={7}>
            <OutstandingDebtCard companyId={activeTab?.id} companyName={activeTab?.title} />
          </Grid.Col>
        </Grid>
        {/* <TableTransaction
          data={payoutData?.data || []}
          onRowClick={handleRowClick}
          onDelete={handleDeletePayoutClick}
          refetchPayoutData={refetchPayoutData}
        /> */}

        {/* {totalPages > 1 && <Pagination mt={10} total={totalPages} value={page} onChange={setPage} />} */}
      </SimpleGrid>
      {/* <PayoutDetails
        payout={selectedPayout}
        opened={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        // refetchPayoutData={refetchPayoutData}
      /> */}
    </SimpleGrid>
  );
}
