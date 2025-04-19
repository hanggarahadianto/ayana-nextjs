import { getOutstandingDebt } from "@/api/finance/getOutstandingDebt";
import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Group, Stack, Loader, Pagination, Select, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import { useEffect, useMemo, useState } from "react";
import OutstandingDebtTable from "./OutstandingDebtTable";

interface OutstandingDebtCardProps {
  companyId: string;
  companyName?: string;
}

export const OutstandingDebtCard = ({ companyId, companyName }: OutstandingDebtCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Debug selectedType
  useEffect(() => {
    console.log("selectedType updated:", selectedType);
  }, [selectedType]);

  const trasactionStatus = "unpaid";
  const transactionType = "payin";

  const {
    data: OutstandingDebtData,
    isLoading,
    refetch: refetchOutstandingDebtData,
  } = useQuery({
    queryKey: ["getOutstandingDebtByCompanyId", companyId, page, limit, selectedType],
    queryFn: () => getOutstandingDebt(companyId, transactionType, trasactionStatus, page, limit),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return OutstandingDebtData?.total ? Math.ceil(OutstandingDebtData.total / limit) : 1;
  }, [OutstandingDebtData]);

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [selectedType]);

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, OutstandingDebtData?.total || 0);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoading} />

      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <Stack gap="xs">
            <Text size="lg" fw={600}>
              Hutang Berjalan {companyName}
            </Text>
            <Select
              label="Filter berdasarkan Type"
              placeholder="Pilih Type"
              //   data={OutstandingDebtTypeOptions}
              value={selectedType}
              onChange={(value) => {
                console.log("Select onChange:", value); // Debug
                setSelectedType(value);
              }}
              clearable
              style={{ width: 250 }}
            />

            {/* <Select
              label="Test Select"
              placeholder="Pilih Type"
              data={[
                { value: "test1", label: "Test 1" },
                { value: "test2", label: "Test 2" },
              ]}
              onChange={(value) => {
                console.log("TEST Select onChange:", value);
                setSelectedType(value);
              }}
              clearable
            /> */}
          </Stack>

          {/* <AddOutstandingDebtModal companyId={companyId} refetchOutstandingDebtData={refetchOutstandingDebtData} /> */}
        </Group>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "50vh", // Pastikan container mengisi tinggi layar
            justifyContent: "space-between", // Paginasi akan tetap di bawah
          }}
        >
          {/* Bagian Tabel */}
          <Box style={{ flex: 1 }}>
            <OutstandingDebtTable data={OutstandingDebtData?.data || []} />
          </Box>

          {/* Bagian Paginasi */}
          {totalPages > 0 && (
            <Stack gap="xs" mt="md" style={{ paddingBottom: "16px" }}>
              <Pagination total={totalPages} value={page} onChange={setPage} />
              <Text size="sm" c="dimmed">
                Menampilkan {startIndex} sampai {endIndex} dari {OutstandingDebtData?.total} data
              </Text>
            </Stack>
          )}
        </Box>
      </Stack>
    </Card>
  );
};
