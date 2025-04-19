"use client";

import { useDeleteDataPayout } from "@/api/payout/deleteDataPayout";
import useGetCompanies from "@/components/page/admin/company/GetCompanyTab";
import AddPayoutModal from "@/components/page/admin/finance/payout/AddPayoutModal";
import PayoutDetails from "@/components/page/admin/finance/payout/GetPayoutDetails";
import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
import LoadingGlobal from "@/styles/loading/loading-global";
import { Group, Pagination, ScrollArea, SimpleGrid, Stack, Table, Tabs, ThemeIcon, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Payout() {
  const { companies, isLoading: isLoadingCompanies } = useGetCompanies();

  const [activeTab, setActiveTab] = useState<ICompany | null>(null);

  useEffect(() => {
    if (companies.length > 0 && !activeTab) {
      setActiveTab(companies[0]);
    }
  }, [companies, activeTab]);

  const handleTabChange = useCallback(
    (companyCode: string | null) => {
      const selected = companies.find((company) => company.company_code === companyCode);
      if (selected) setActiveTab(selected);
    },
    [companies]
  );

  // const {
  //   data: payoutData,
  //   isLoading: isLoadingPayoutData,
  //   refetch: refetchPayoutData,
  // } = useQuery({
  //   queryKey: ["getPayoutData", activeTab?.id],
  //   queryFn: () => (activeTab ? getDataPayout(activeTab.id) : Promise.resolve(null)),
  //   enabled: !!activeTab,
  //   refetchOnWindowFocus: false,
  // });

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
      {/* <LoadingGlobal visible={isLoadingCompanies || isLoadingPayoutData} /> */}
      <Tabs value={activeTab?.company_code} onChange={handleTabChange}>
        <Tabs.List>
          {companies.map((company) => (
            <Tabs.Tab key={company.company_code} value={company.company_code}>
              {company.title}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {companies.map((company) => (
          <Tabs.Panel key={company.company_code} value={company.company_code}>
            <Stack p={12} justify="flex-end" align="flex-end">
              <AddPayoutModal
                // refetchPayloadData={refetchPayoutData}
                companyCode={activeTab?.company_code}
                companyId={company?.id}
                refetchPayloadData={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
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
      {/* <PayoutDetails
        payout={selectedPayout}
        opened={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        // refetchPayoutData={refetchPayoutData}
      /> */}
    </SimpleGrid>
  );
}
