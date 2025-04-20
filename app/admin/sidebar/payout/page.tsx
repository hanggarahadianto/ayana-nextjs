"use client";

import { useDeleteDataPayout } from "@/api/payout/deleteDataPayout";
import useGetCompanies from "@/components/page/admin/company/GetCompanyTab";
import AddPayoutModal from "@/components/page/admin/finance/payout/AddPayoutModal";
import PayoutDetails from "@/components/page/admin/finance/payout/GetPayoutDetails";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import LoadingGlobal from "@/styles/loading/loading-global";
import { Group, Pagination, ScrollArea, SimpleGrid, Stack, Table, ThemeIcon, Text, Tabs } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import CreateJournalEntryModal from "@/components/page/admin/finance/journalEntry/CreateJournalEntryModal";
import UseCompanyTabs from "@/components/common/tab/CompanyTab";
import { getExpenseSummary } from "@/api/finance/getExpenseSummary";
import ExpenseSummaryTable from "@/components/page/admin/finance/payout/ExpenseSummaryTable";
import { GetExpenseSummaryData } from "@/components/page/admin/finance/payout/GetExpenseSummayData";

export default function Payout() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs(); // Use the custom hook

  const {
    data: expenseSummaryData,
    isLoading: isLoadingExpenseSummaryData,
    refetch: refetchPayoutData,
  } = useQuery({
    queryKey: ["getExpenseSummaryData", activeTab?.id],
    queryFn: () => (activeTab ? getExpenseSummary({ companyId: activeTab?.id, page: 1, limit: 10 }) : Promise.resolve(null)),
    enabled: !!activeTab,
    refetchOnWindowFocus: false,
  });

  // const { mutate: mutateDeleteDataPayout, isPending: isLoadingDeleteDataPayout } = useDeleteDataPayout(refetchPayoutData);

  // const handleDeletePayoutClick = useCallback(
  //   (idToDelete: string) => {
  //     console.log("Menghapus payout dengan ID:", idToDelete);
  //     mutateDeleteDataPayout(idToDelete);
  //   },
  //   [mutateDeleteDataPayout]
  // );

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  // const totalPages = useMemo(() => Math.ceil((payoutData?.total || 1) / rowsPerPage), [payoutData]);

  const [selectedPayout, setSelectedPayout] = useState<IPayoutUpdate | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  console.log(isDetailsModalOpen);

  const handleRowClick = (payout: IPayoutUpdate) => {
    setSelectedPayout(payout);
    setIsDetailsModalOpen(true);
  };
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
            <Stack p={12} justify="flex-end" align="flex-end" style={{ width: "100%" }}>
              {/* <AddPayinModal companyCode={activeTab?.company_code} companyId={company?.id} />
               */}
              <CreateJournalEntryModal transactionType={"payout"} companyId={company?.id} />
            </Stack>
          </Tabs.Panel>
        ))}
      </Tabs>
      <SimpleGrid p={20}>
        {/* <TableTransaction
          data={payoutData?.data || []}
          onRowClick={handleRowClick}
          onDelete={handleDeletePayoutClick}
          refetchPayoutData={refetchPayoutData}
        /> */}

        {expenseSummaryData && <GetExpenseSummaryData companyName={activeTab?.title || ""} expenseSummaryData={expenseSummaryData} />}

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
