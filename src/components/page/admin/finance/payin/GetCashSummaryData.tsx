import { Card, Text, Group, Stack, Loader, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getCashSummary } from "@/api/finance/getCashSummary";
import LoadingGlobal from "@/styles/loading/loading-global";
import CashSummaryTable from "./CashSummaryTable";
import { formatCurrency } from "@/utils/formatCurrency";

interface CashSummaryCardProps {
  companyId: string;
  companyName?: string;
}

export const GetCashSummaryData = ({ companyId, companyName }: CashSummaryCardProps) => {
  const {
    data: cashSummaryData,
    isPending: isLoadingCashSummaryData,
    refetch: refetchCashSummaryData,
  } = useQuery({
    queryKey: ["getCashSummaryByCompanyId", companyId],
    queryFn: () => getCashSummary(companyId),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  console.log("cash smmary", cashSummaryData);

  const cashList = cashSummaryData?.data?.cashList || [];

  const cashIn = cashList.filter((item) => item.cash_flow_type === "cash_in");
  const cashOut = cashList.filter((item) => item.cash_flow_type === "cash_out");

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingCashSummaryData} />

      <Stack gap="md">
        <Group justify="space-between">
          <Text size="lg" fw={600}>
            Ringkasan Kas {companyName}
          </Text>
        </Group>

        <Box>
          <Group justify="space-between" p={20}>
            <Text fw={600} mb="xs" mt={20}>
              Cash In
            </Text>
            <Text fw={800} size="xl" c="green">
              {formatCurrency(cashSummaryData?.data.available_cash ?? 0)}
            </Text>
          </Group>

          <CashSummaryTable data={cashIn} />
        </Box>

        <Box>
          <Text fw={600} mt={20} mb="xs">
            Cash Out
          </Text>
          <CashSummaryTable data={cashOut} />
        </Box>
      </Stack>
    </Card>
  );
};
