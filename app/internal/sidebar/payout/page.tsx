"use client";

import { useState, useEffect } from "react";
import { Group, Pagination, ScrollArea, SimpleGrid, Stack, Table, Tabs } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import AddPayoutModal from "../../../../src/components/internal/sidebar/finance/AddPayoutModal"; // Sesuaikan path
import { getDataCompany } from "@/api/company/getCompany"; // Sesuaikan path
import { getDataPayout } from "@/api/payout/getDataPayout";
import ButtonDeleteWithConfirmation from "@/lib/button/buttonDeleteConfirmation";
import { useDeleteDataPayout } from "@/api/payout/deleteDataPayout";
import EditPayoutModal from "@/components/internal/sidebar/finance/EditPayoutModal";

export default function Payout() {
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

  if (isLoading) return <p>Loading...</p>;
  if (!payoutData || !payoutData.data) return <p>Data tidak tersedia.</p>;

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
            <Stack p={12} justify="flex-end" align="flex-end" style={{ width: "100%" }}>
              <AddPayoutModal refetchPayloadData={refetchPayoutData} companyCode={activeTab?.company_code} companyId={company?.id} />
            </Stack>
          </Tabs.Panel>
        ))}
      </Tabs>
      <SimpleGrid p={20}>
        <ScrollArea>
          <Table highlightOnHover withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ minWidth: 120, maxWidth: 150, textAlign: "center" }}>Invoice</Table.Th>
                <Table.Th style={{ minWidth: 100, maxWidth: 120, textAlign: "center" }}>Nominal</Table.Th>
                <Table.Th style={{ minWidth: 100, maxWidth: 120, textAlign: "center" }}>Tanggal</Table.Th>
                <Table.Th style={{ minWidth: 200, maxWidth: 250, textAlign: "center" }}>Catatan</Table.Th>
                <Table.Th style={{ minWidth: 100, maxWidth: 120, textAlign: "center" }}>Aksi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {payoutData?.data.map((payout: IPayoutUpdate) => {
                console.log("payout di page", payout);
                return (
                  <Table.Tr key={payout.id}>
                    <Table.Td>{payout.invoice}</Table.Td>
                    <Table.Td>{payout.nominal.toLocaleString("id-ID")}</Table.Td>
                    <Table.Td>
                      {new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "long", year: "numeric" }).format(
                        new Date(payout.date_inputed)
                      )}
                    </Table.Td>

                    <Table.Td>{payout.note}</Table.Td>
                    <Table.Td style={{ textAlign: "center" }}>
                      <Group ml={4}>
                        <EditPayoutModal payout={payout} refetchPayoutData={refetchPayoutData} />
                        <ButtonDeleteWithConfirmation
                          id={payout?.id}
                          onDelete={handleDeletePayoutClick} // Pastikan pakai handler yang benar
                          description={`Apakah Anda yakin ingin menghapus invoice ${payout?.invoice}?`}
                          size={2}
                        />
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </ScrollArea>

        {totalPages > 1 && <Pagination mt={10} total={totalPages} value={page} onChange={setPage} />}
      </SimpleGrid>
    </SimpleGrid>
  );
}
