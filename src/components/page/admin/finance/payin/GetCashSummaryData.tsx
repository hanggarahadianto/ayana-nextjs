import { Card, Text, Group, Stack, Loader, Box, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getCashSummary } from "@/api/finance/getCashSummary";
import LoadingGlobal from "@/styles/loading/loading-global";
import { formatCurrency } from "@/utils/formatCurrency";
import CreateJournalEntryModal from "../journalEntry/CreateJournalEntryModal";
import { CashSummaryTable } from "./CashSummaryTable";

interface CashSummaryCardProps {
  companyId: string;
  companyName?: string;
  transactionType?: string;
}

export const GetCashSummaryData = ({ companyId, companyName, transactionType }: CashSummaryCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: cashSummaryData,
    isPending: isLoadingCashSummaryData,
    refetch: refetchCashSummaryData,
  } = useQuery({
    queryKey: ["getCashSummaryByCompanyId", companyId, page],
    queryFn: () => getCashSummary(companyId, page, limit, transactionType),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });
  const cashList = cashSummaryData?.data.cashList;

  const inflowList = cashList?.filter((item) => item?.category === "inflow");
  const outflowList = cashList?.filter((item) => item?.category === "outflow");

  const totalPages = Math.ceil((cashSummaryData?.data?.total ?? 0) / limit);

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, cashSummaryData?.data.total || 0);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingCashSummaryData} />

      <Stack gap="md">
        <Group justify="space-between">
          <Text size="lg" fw={600}>
            Ringkasan Kas {companyName}
          </Text>
          <Stack p={20}>
            <CreateJournalEntryModal transactionType={"payin"} companyId={companyId} refetchData={refetchCashSummaryData} />
          </Stack>
        </Group>

        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "50vh", // Pastikan container mengisi tinggi layar
            justifyContent: "space-between", // Paginasi akan tetap di bawah
          }}
        >
          <Group justify="space-between" p={20}>
            <Text fw={600} mb="xs" mt={20}>
              Cash In
            </Text>
            <Text fw={800} size="xl" c="green">
              {formatCurrency(cashSummaryData?.data?.available_cash ?? 0)}
            </Text>
          </Group>
          <CashSummaryTable data={inflowList ?? []} />

          <Group gap="xs" mt="md" style={{ paddingBottom: "16px" }}>
            <Pagination total={totalPages} value={page} onChange={setPage} />
            <Text size="sm" c="dimmed">
              Menampilkan {startIndex} sampai {endIndex} dari {cashSummaryData?.data.total} data
            </Text>
          </Group>
        </Box>

        {/* <Box>
          <Text fw={600} mt={20} mb="xs">
            Cash Out
          </Text>
          <CashSummaryTable data={cashOut} />
        </Box> */}
      </Stack>
    </Card>
  );
};
