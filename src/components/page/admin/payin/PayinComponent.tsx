"use client";
import { SimpleGrid, Stack, Table, Tabs } from "@mantine/core";

import UseCompanyTabs from "@/components/common/tab/TabCompany";
import { GetCashSummaryData } from "../finance/cashIn/GetCashSummaryData";

export default function PayinComponent() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs(); // Use the custom hook

  return (
    <SimpleGrid mt={10}>
      {/* <LoadingGlobal visible={isLoadingPayoutData || isLoadingDeleteDataPayout} /> */}
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
        <GetCashSummaryData companyId={activeTab?.id || ""} companyName={activeTab?.title} transactionType="payin" />
        {/* <TableTransaction
          data={payoutData?.data || []}
          onRowClick={handleRowClick}
          onDelete={handleDeletePayoutClick}
          refetchPayoutData={refetchPayoutData}
        /> */}
        {/* {totalPages > 1 && <Pagination mt={10} total={totalPages} value={page} onChange={setPage} />} */}
      </SimpleGrid>
      {/* <OutstandingDebtCard companyName={activeTab?.title} OutstandingDebtData={undefined} /> */}
    </SimpleGrid>
  );
}
