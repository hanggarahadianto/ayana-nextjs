"use client";

import { useState, useEffect } from "react";
import { Pagination, SimpleGrid, Stack, Table, Tabs } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // Sesuaikan path
import { getDataCompany } from "@/api/company/getCompany"; // Sesuaikan path
import { useDeleteDataPayout } from "@/api/payout/deleteDataPayout";
import LoadingGlobal from "@/styles/loading/loading-global";
import AddPayoutModal from "@/components/page/admin/finance/payout/AddPayoutModal";
import AddPayinModal from "@/components/page/admin/finance/payin/AddPayinModal";
import CreateJournalEntryModal from "@/components/page/admin/finance/journalEntry/CreateJournalEntryModal";
import UseCompanyTabs from "@/components/common/tab/CompanyTab";
import { OutstandingDebtCard } from "@/components/page/admin/finance/OutstandingDebit/OutstandingDebtCard";

export default function CompanyTabs() {
  const { companies, isLoadingCompanies, activeTab, handleTabChange } = UseCompanyTabs(); // Use the custom hook

  // const {
  //   data: payoutData,
  //   isLoading: isLoadingPayoutData,
  //   refetch: refetchPayoutData,
  // } = useQuery({
  //   queryKey: ["getPayoutData", activeTab], // Gunakan key unik
  //   queryFn: () => {
  //     if (!activeTab) return Promise.resolve(null); // Prevent fetch if ID is null
  //     return getDataPayout(activeTab.id);
  //   },
  //   enabled: !!activeTab, // Hanya fetch jika ID ada
  //   refetchOnWindowFocus: false,
  // });

  // const { mutate: mutateDeleteDataPayout, isPending: isLoadingDeleteDataPayout } = useDeleteDataPayout(refetchPayoutData);

  // const handleDeletePayoutClick = (idToDelete: string) => {
  //   console.log("Menghapus payout dengan ID:", idToDelete);
  //   mutateDeleteDataPayout(idToDelete);
  // };

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // console.log("PAYOUT DATA", payoutData);

  // const totalPages = Math.ceil((payoutData?.total || 1) / rowsPerPage);

  // const [selectedPayout, setSelectedPayout] = useState<IPayoutUpdate | null>(null);
  // const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // const handleRowClick = (payout: IPayoutUpdate) => {
  //   setSelectedPayout(payout);
  //   setIsDetailsModalOpen(true);
  // };

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
              <CreateJournalEntryModal transactionType={"payin"} companyId={company?.id} />
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
        {/* {totalPages > 1 && <Pagination mt={10} total={totalPages} value={page} onChange={setPage} />} */}
      </SimpleGrid>
      {/* <OutstandingDebtCard companyName={activeTab?.title} OutstandingDebtData={undefined} /> */}
    </SimpleGrid>
  );
}
