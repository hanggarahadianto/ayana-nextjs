"use client";

import { useState, useEffect } from "react";
import { Pagination, SimpleGrid, Stack, Table, Tabs } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // Sesuaikan path
import { getDataCompany } from "@/api/company/getCompany"; // Sesuaikan path
import { getDataPayout } from "@/api/payout/getDataPayout";
import { useDeleteDataPayout } from "@/api/payout/deleteDataPayout";
import LoadingGlobal from "@/styles/loading/loading-global";
import TableTransaction from "@/components/internal/sidebar/finance/TableTransaction";
import AddPayoutModal from "@/components/internal/sidebar/finance/payout/AddPayoutModal";

export default function CompanyTabs() {
  const { data: companyData, isLoading } = useQuery({
    queryKey: ["getCompanyData"],
    queryFn: getDataCompany,
    refetchOnWindowFocus: false,
  });

  const companies = Array.isArray(companyData?.data) ? companyData.data.sort((a, b) => a.company_code.localeCompare(b.company_code)) : [];

  console.log("companies", companies);

  const [activeTab, setActiveTab] = useState<ICompany>(companies[0]);

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

  console.log("Active Tab:", activeTab);

  const {
    data: payoutData,
    isLoading: isLoadingPayoutData,
    refetch: refetchPayoutData,
  } = useQuery({
    queryKey: ["getPayoutData", activeTab], // Gunakan key unik
    queryFn: () => {
      if (!activeTab) return Promise.resolve(null); // Prevent fetch if ID is null
      return getDataPayout(activeTab.id);
    },
    enabled: !!activeTab, // Hanya fetch jika ID ada
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateDeleteDataPayout, isPending: isLoadingDeleteDataPayout } = useDeleteDataPayout(refetchPayoutData);

  const handleDeletePayoutClick = (idToDelete: string) => {
    console.log("Menghapus payout dengan ID:", idToDelete);
    mutateDeleteDataPayout(idToDelete);
  };

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // console.log("PAYOUT DATA", payoutData);

  const totalPages = Math.ceil((payoutData?.total || 1) / rowsPerPage);

  const [selectedPayout, setSelectedPayout] = useState<IPayoutUpdate | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  console.log(isDetailsModalOpen);

  const handleRowClick = (payout: IPayoutUpdate) => {
    setSelectedPayout(payout);
    setIsDetailsModalOpen(true);
  };

  return (
    <SimpleGrid mt={10}>
      <LoadingGlobal visible={isLoadingPayoutData || isLoadingDeleteDataPayout} />
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
              <AddPayoutModal refetchPayloadData={refetchPayoutData} companyCode={activeTab?.company_code} companyId={company?.id} />
            </Stack>
          </Tabs.Panel>
        ))}
      </Tabs>
      <SimpleGrid p={20}>
        <TableTransaction
          data={payoutData?.data || []}
          onRowClick={handleRowClick}
          onDelete={handleDeletePayoutClick}
          refetchPayoutData={refetchPayoutData}
        />
        {totalPages > 1 && <Pagination mt={10} total={totalPages} value={page} onChange={setPage} />}
      </SimpleGrid>
    </SimpleGrid>
  );
}
