import LoadingGlobal from "@/styles/loading/loading-global";
import { Card, Text, Group, Stack, Loader, Pagination, Select, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import AddAccountModal from "./addAccountModal";
import { getDataAccount } from "@/api/account/getDataAccount";
import AccountTable from "@/components/page/admin/finance/account/TableAccount";
import { useEffect, useMemo, useState } from "react";
import { accountTypeOptions, typeOptions } from "@/constants/dictionary";

interface AccountCardProps {
  companyId: string;
  companyName?: string;
}

export const AccountCard = ({ companyId, companyName }: AccountCardProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Debug selectedType
  useEffect(() => {
    console.log("selectedType updated:", selectedType);
  }, [selectedType]);

  const {
    data: accountData,
    isLoading,
    refetch: refetchAccountData,
  } = useQuery({
    queryKey: ["getAccountByCompanyId", companyId, page, limit, selectedType],
    queryFn: () => getDataAccount(companyId, page, limit, selectedType),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return accountData?.total ? Math.ceil(accountData.total / limit) : 1;
  }, [accountData]);

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [selectedType]);

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, accountData?.total || 0);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoading} />

      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <Stack gap="xs">
            <Text size="lg" fw={600}>
              Akun Keuangan {companyName}
            </Text>
            <Select
              label="Filter berdasarkan Type"
              placeholder="Pilih Type"
              data={accountTypeOptions}
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

          <AddAccountModal companyId={companyId} refetchAccountData={refetchAccountData} />
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
            <AccountTable data={accountData?.data || []} />
          </Box>

          {/* Bagian Paginasi */}
          {totalPages > 0 && (
            <Stack gap="xs" mt="md" style={{ paddingBottom: "16px" }}>
              <Pagination total={totalPages} value={page} onChange={setPage} />
              <Text size="sm" c="dimmed">
                Menampilkan {startIndex} sampai {endIndex} dari {accountData?.total} data
              </Text>
            </Stack>
          )}
        </Box>
      </Stack>
    </Card>
  );
};
