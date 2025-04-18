// "use client";

// import { useDeleteDataPayout } from "@/api/payout/deleteDataPayout";
// import { getDataPayout } from "@/api/payout/getDataPayout";
// import useGetCompanies from "@/components/page/admin/company/GetCompanyTab";
// import AddPayoutModal from "@/components/page/admin/finance/payout/AddPayoutModal";
// import PayoutDetails from "@/components/page/admin/finance/payout/GetPayoutDetails";
// import ButtonDeleteWithConfirmation from "@/components/common/button/buttonDeleteConfirmation";
// import LoadingGlobal from "@/styles/loading/loading-global";
// import { Group, Pagination, ScrollArea, SimpleGrid, Stack, Table, Tabs, ThemeIcon, Text } from "@mantine/core";
// import { useQuery } from "@tanstack/react-query";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import AccountTable from "@/components/page/admin/finance/account/TableAccount";
// import { getDataAccount } from "@/api/account/getDataAccount";

// export default function AccountDataByCompanyId(companyId: string) {
//   const rowsPerPage = 5;

//   const {
//     data: accountData,
//     isLoading: isLoadingAccountData,
//     refetch: refetchAccountData,
//   } = useQuery({
//     queryKey: ["getAccountData", companyId],
//     queryFn: () => (companyId ? getDataAccount(companyId, 10) : Promise.resolve(null)),
//     enabled: !!companyId,
//     refetchOnWindowFocus: false,
//   });

//   //   const { mutate: mutateDeleteDataPayout, isPending: isLoadingDeleteDataPayout } = useDeleteDataPayout(refetchPayoutData);

//   //   const handleDeletePayoutClick = useCallback(
//   //     (idToDelete: string) => {
//   //       mutateDeleteDataPayout(idToDelete);
//   //     },
//   //     [mutateDeleteDataPayout]
//   //   );

//   const [page, setPage] = useState(1);
//   const totalPages = useMemo(() => Math.ceil((accountData?.total || 1) / rowsPerPage), [accountData]);

//   const [selectedPayout, setSelectedPayout] = useState<IPayoutUpdate | null>(null);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//   console.log(isDetailsModalOpen);

//   const handleRowClick = (payout: IPayoutUpdate) => {
//     setSelectedPayout(payout);
//     setIsDetailsModalOpen(true);
//   };
//   return (
//     <SimpleGrid mt={10}>
//       <LoadingGlobal visible={isLoadingAccountData} />
//       <AccountTable
//         data={accountData?.data || []}
//         onRowClick={function (account: IAccount): void {
//           throw new Error("Function not implemented.");
//         }}
//         onDelete={function (id: string): void {
//           throw new Error("Function not implemented.");
//         }}
//         refetchAccountData={function (): void {
//           throw new Error("Function not implemented.");
//         }}
//       />
//       {/* <TableTransaction
//         data={accountData?.data || []}
//         onRowClick={handleRowClick}
//         // onDelete={handleDeletePayoutClick}
//         refetchAccountData={refetchAccountData}
//       /> */}
//       {/*  <Tabs value={activeTab?.company_code} onChange={handleTabChange}>
//         <Tabs.List>
//           {companies.map((company) => (
//             <Tabs.Tab key={company.company_code} value={company.company_code}>
//               {company.title}
//             </Tabs.Tab>
//           ))}
//         </Tabs.List>

//         {companies.map((company) => (
//           <Tabs.Panel key={company.company_code} value={company.company_code}>
//             <Stack p={12} justify="flex-end" align="flex-end">
//               <AddPayoutModal refetchPayloadData={refetchPayoutData} companyCode={activeTab?.company_code} companyId={company?.id} />
//             </Stack>
//           </Tabs.Panel>
//         ))}
//       </Tabs>

//       <SimpleGrid p={20}>
//         <TableTransaction
//           data={payoutData?.data || []}
//           onRowClick={handleRowClick}
//           onDelete={handleDeletePayoutClick}
//           refetchPayoutData={refetchPayoutData}
//         />

//         {totalPages > 1 && <Pagination mt={10} total={totalPages} value={page} onChange={setPage} />}
//       </SimpleGrid>
//       <PayoutDetails
//         payout={selectedPayout}
//         opened={isDetailsModalOpen}
//         onClose={() => setIsDetailsModalOpen(false)}
//         refetchPayoutData={refetchPayoutData}
//       /> */}
//     </SimpleGrid>
//   );
// }
