"use client";
import { SimpleGrid, Stack, Table, Tabs } from "@mantine/core";

import UseCompanyTabs from "@/components/common/tab/TabGetCompany";
import { GetCashSummaryData } from "../finance/cashIn/GetCashSummaryData";
import SimpleGridGlobal from "@/components/common/grid/SimpleGridGlobal";
import LoadingGlobal from "@/styles/loading/loading-global";
import GlobalTab from "@/components/common/tab/TabGlobal";

export default function PayinComponent() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs(); // Use the custom hook

  return (
    <SimpleGridGlobal cols={1}>
      <LoadingGlobal visible={isLoadingCompanies} />
      <GlobalTab data={companies} activeTab={activeTab?.company_code ?? null} onTabChange={handleTabChange} />

      {/* <Tabs
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
      </Tabs> */}
      <SimpleGridGlobal cols={1}>
        <GetCashSummaryData companyId={activeTab?.id || ""} companyName={activeTab?.title} transactionType="payin" />
        {/* <TableTransaction
          data={payoutData?.data || []}
          onRowClick={handleRowClick}
          onDelete={handleDeletePayoutClick}
          refetchPayoutData={refetchPayoutData}
        /> */}
        {/* {totalPages > 1 && <Pagination mt={10} total={totalPages} value={page} onChange={setPage} />} */}
      </SimpleGridGlobal>
      {/* <OutstandingDebtCard companyName={activeTab?.title} OutstandingDebtData={undefined} /> */}
    </SimpleGridGlobal>
  );
}
