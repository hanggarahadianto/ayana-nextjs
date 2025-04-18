// // import { getDataDebt } from "@/api/payout/getDataDebt";
// import LoadingGlobal from "@/helper/styles/loading/loading-global";
// import { Card, Text, Group, Stack, Loader } from "@mantine/core";
// import { useQuery } from "@tanstack/react-query"; // assumed path
// import { useMemo } from "react";
// import AddInvestment from "./AddInvestmentModal";
// import AddInvestmentModal from "./AddInvestmentModal";

// export const InvestmentCard = ({ companyId }: { companyId: any }) => {
//   const { data, isLoading } = useQuery({
//     queryKey: ["getDebtByCompanyId", companyId],
//     queryFn: () => getDataDebt(companyId),
//     enabled: !!companyId,
//     refetchOnWindowFocus: false,
//   });

//   const totalNominal = useMemo(() => {
//     if (!data?.data) return 0;
//     return data.data.reduce((sum: number, item: IPayout) => sum + item.nominal, 0);
//   }, [data]);

//   return (
//     <Card shadow="sm" padding="lg" radius="md" withBorder>
//       <LoadingGlobal visible={isLoading} />

//       <Group justify="space-between" p={20}>
//         <Stack>
//           <Text size="lg" fw={600}>
//             Total Investasi
//           </Text>
//           <Text size="xl" c="red">
//             {new Intl.NumberFormat("id-ID", {
//               style: "currency",
//               currency: "IDR",
//               minimumFractionDigits: 2,
//               maximumFractionDigits: 2,
//             }).format(totalNominal)}
//           </Text>

//           <Group mt="md">
//             <Text size="sm" c="dimmed">
//               {data?.total} data ditemukan
//             </Text>
//             <Text size="sm" c="gray">
//               Halaman {data?.page} dari {Math.ceil((data?.total ?? 0) / (data?.limit ?? 1))}
//             </Text>
//           </Group>
//         </Stack>
//         <Stack>
//           <AddInvestmentModal
//             refetchPayloadData={function (): void {
//               throw new Error("Function not implemented.");
//             }}
//             companyCode={undefined}
//             companyId={null}
//           />
//         </Stack>
//       </Group>
//     </Card>
//     // </Group>
//   );
// };
