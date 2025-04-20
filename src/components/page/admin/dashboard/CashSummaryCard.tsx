import { getCashSummary } from "@/api/finance/getCashSummary";
import LoadingGlobal from "@/styles/loading/loading-global";

import { formatCurrency } from "@/utils/formatCurrency";
import { Card, Text, Group, Stack, Loader, Pagination, Select, Box, Button, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

interface CashSummaryCardProps {
  companyId: string;
  companyName?: string;
}

export const CashSummaryCard = ({ companyId, companyName }: CashSummaryCardProps) => {
  const {
    data: CashSummaryData,
    isPending: isLoadingCashSummaryData,
    refetch: refetchCashSummaryData,
  } = useQuery({
    queryKey: ["getCashSummaryByCompanyId", companyId],
    queryFn: () => getCashSummary(companyId),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  console.log("CASH", CashSummaryData);

  //   const totalPages = useMemo(() => {
  //     return CashSummaryData?.total ? Math.ceil(CashSummaryData.total / limit) : 1;
  //   }, [CashSummaryData]);

  //   // Reset page when filter changes
  //   useEffect(() => {
  //     setPage(1);
  //   }, [selectedType]);

  //   const startIndex = (page - 1) * limit + 1;
  //   const endIndex = Math.min(page * limit, CashSummaryData?.total || 0);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingCashSummaryData} />

      <Card shadow="sm" padding="lg">
        <Title order={3}>Cash Summary</Title>
        <Group mb="md">
          <Text>Cash Tersedia: {formatCurrency(CashSummaryData?.data.available_cash ?? 0)}</Text>
        </Group>
        {/* <Text>{cashSummary?.message}</Text> */}

        <div>
          <Title order={4}>Summary</Title>
          <ul>
            {CashSummaryData?.data.cashList?.map((item: ICashSummaryItem, index) => (
              <li key={index}>
                <Text>{item.description}</Text>
                <Text>Amount: {item.amount}</Text>
                <Text>Date: {item.date}</Text>
                <Text>Status: {item.status}</Text>
              </li>
            ))}
          </ul>
        </div>

        <Button
          variant="light"
          color="blue"
          mt="md"
          onClick={() => refetchCashSummaryData()}
          disabled={isLoadingCashSummaryData}
          loading={isLoadingCashSummaryData}
        >
          Refresh
        </Button>
      </Card>

      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          {/* <Stack gap="xs">
            <Text size="lg" fw={600}>
              Hutang Berjalan {companyName}
            </Text>
            <Select
              label="Filter berdasarkan Type"
              placeholder="Pilih Type"
              //   data={CashSummaryTypeOptions}
              value={selectedType}
              onChange={(value) => {
                console.log("Select onChange:", value); // Debug
                setSelectedType(value);
              }}
              clearable
              style={{ width: 250 }}
            />
          </Stack> */}

          {/* <AddCashSummaryModal companyId={companyId} refetchCashSummaryData={refetchCashSummaryData} /> */}
        </Group>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "50vh", // Pastikan container mengisi tinggi layar
            justifyContent: "space-between", // Paginasi akan tetap di bawah
          }}
        ></Box>
      </Stack>
    </Card>
  );
};
