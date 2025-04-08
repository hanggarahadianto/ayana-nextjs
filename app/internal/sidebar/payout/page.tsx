"use client";

import { useDeleteDataPayout } from "@/api/payout/deleteDataPayout";
import { getDataPayout } from "@/api/payout/getDataPayout";
import useGetCompanies from "@/components/internal/sidebar/company/GetCompanyTab";
import AddPayoutModal from "@/components/internal/sidebar/finance/AddPayoutModal";
import EditPayoutModal from "@/components/internal/sidebar/finance/EditPayoutModal";
import ButtonDeleteWithConfirmation from "@/lib/button/buttonDeleteConfirmation";
import { Group, Pagination, ScrollArea, SimpleGrid, Stack, Table, Tabs } from "@mantine/core";
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

  const {
    data: payoutData,
    isLoading: isLoadingPayoutData,
    refetch: refetchPayoutData,
  } = useQuery({
    queryKey: ["getPayoutData", activeTab?.id],
    queryFn: () => (activeTab ? getDataPayout(activeTab.id) : Promise.resolve(null)),
    enabled: !!activeTab,
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateDeleteDataPayout, isPending: isLoadingDeleteDataPayout } = useDeleteDataPayout(refetchPayoutData);

  const handleDeletePayoutClick = useCallback(
    (idToDelete: string) => {
      console.log("Menghapus payout dengan ID:", idToDelete);
      mutateDeleteDataPayout(idToDelete);
    },
    [mutateDeleteDataPayout]
  );

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = useMemo(() => Math.ceil((payoutData?.total || 1) / rowsPerPage), [payoutData]);

  if (isLoadingCompanies) return <p>Loading...</p>;
  if (!payoutData || !payoutData.data) return <p>Data tidak tersedia.</p>;

  return (
    <SimpleGrid mt={10}>
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
                <Table.Th style={{ textAlign: "center" }}>Invoice</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Nominal</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Tanggal</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Catatan</Table.Th>
                <Table.Th style={{ textAlign: "center" }}>Aksi</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {payoutData.data.map((payout: IPayoutUpdate) => (
                <Table.Tr key={payout.id}>
                  <Table.Td>{payout.invoice}</Table.Td>
                  <Table.Td>{payout.nominal.toLocaleString("id-ID")}</Table.Td>
                  <Table.Td>
                    {new Intl.DateTimeFormat("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(payout.date_inputed))}
                  </Table.Td>
                  <Table.Td>{payout.note}</Table.Td>
                  <Table.Td style={{ textAlign: "center" }}>
                    <Group ml={4}>
                      <EditPayoutModal payout={payout} refetchPayoutData={refetchPayoutData} />
                      <ButtonDeleteWithConfirmation
                        id={payout.id}
                        onDelete={handleDeletePayoutClick}
                        description={`Apakah Anda yakin ingin menghapus invoice ${payout.invoice}?`}
                        size={2}
                      />
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>

        {totalPages > 1 && <Pagination mt={10} total={totalPages} value={page} onChange={setPage} />}
      </SimpleGrid>
    </SimpleGrid>
  );
}
