import { getOutstandingDebt } from "@/api/finance/getOutstandingDebt";
import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Group, Stack, Loader, Pagination, Select, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useEffect, useMemo, useState } from "react";
import OutstandingDebtTable from "./OutstandingDebtTable";
import { formatCurrency } from "@/utils/formatCurrency";

interface GetOutStandingDebtDataProps {
  companyId?: string;
  companyName?: string;
}

export const GetOutstandingDebtData = ({ companyId, companyName }: GetOutStandingDebtDataProps) => {
  const limit = 10;
  const [pageOutstandingDebt, setPageOutstandingDebt] = useState(1);

  const [selectedType, setSelectedType] = useState<string | null>(null);

  const {
    data: outstandingDebtData,
    isLoading: isLoadingOutstandingDebt,
    refetch: refetchOutstandingDebtData,
  } = useQuery({
    queryKey: ["getOutstandingDebtByCompanyId", companyId, pageOutstandingDebt, limit],
    queryFn: async () => {
      if (!companyId) return null;

      return await getOutstandingDebt({
        companyId,
        page: pageOutstandingDebt,
        limit,
      });
    },
    enabled: Boolean(companyId),
    refetchOnWindowFocus: false,
  });

  console.log("OUTSTANDING debt", outstandingDebtData);

  // Debug selectedType
  useEffect(() => {
    console.log("selectedType updated:", selectedType);
  }, [selectedType]);

  const totalPages = useMemo(() => {
    return outstandingDebtData?.data?.total ? Math.ceil(outstandingDebtData.data.total / limit) : 1;
  }, [outstandingDebtData]);

  const startIndex = (pageOutstandingDebt - 1) * limit + 1;
  const endIndex = Math.min(pageOutstandingDebt * limit, outstandingDebtData?.data.total || 0);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoadingOutstandingDebt} />

      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <Stack gap="xs">
            <Text size="lg" fw={600}>
              Hutang Berjalan {companyName}
            </Text>
            <Select
              label="Filter berdasarkan Type"
              placeholder="Pilih Type"
              value={selectedType}
              onChange={(value) => {
                setSelectedType(value);
              }}
              clearable
              style={{ width: 250 }}
            />
          </Stack>
          <Group justify="space-between" p={20}>
            <Text fw={800} size="xl">
              {formatCurrency(outstandingDebtData?.data?.total_outstandingDebt ?? 0)}
            </Text>
          </Group>
        </Group>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "50vh", // Pastikan container mengisi tinggi layar
            justifyContent: "space-between", // Paginasi akan tetap di bawah
          }}
        >
          <Box style={{ flex: 1 }}>
            <Box style={{ flex: 1 }}>
              <OutstandingDebtTable data={outstandingDebtData?.data.debtList || []} startIndex={startIndex} companyId={companyId} />
            </Box>
          </Box>

          {/* Bagian Paginasi */}
          {totalPages > 0 && (
            <Stack gap="xs" mt="md" style={{ paddingBottom: "16px" }}>
              <Pagination total={totalPages} value={pageOutstandingDebt} onChange={setPageOutstandingDebt} />
              <Text size="sm" c="dimmed">
                Menampilkan {startIndex} sampai {endIndex} dari {outstandingDebtData?.data.total} data
              </Text>
            </Stack>
          )}
        </Box>
      </Stack>
    </Card>
  );
};
