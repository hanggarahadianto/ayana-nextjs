import LoadingGlobal from "@/helper/styles/loading/loading-global";
import { Card, Text, Group, Stack, Loader, Pagination, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import AddAccountModal from "./addAccountModal";
import { getDataAccount } from "@/api/account/getDataAccount";
import AccountTable from "@/components/page/admin/finance/account/accountTable";
import { useEffect, useMemo, useState } from "react";
import { accountTypeOptions, typeOptions } from "@/constants/dictionary";

interface AccountCardProps {
  companyId: string;
}

export const AccountCard = ({ companyId }: AccountCardProps) => {
  const [page, setPage] = useState(1);
  console.log("PAGE", page);

  const limit = 10;

  const [selectedType, setSelectedType] = useState<string | null>(null);

  const {
    data: accountData,
    isLoading,
    refetch: refetchAccountData,
  } = useQuery({
    queryKey: ["getAccountByCompanyId", companyId, page, selectedType],
    queryFn: () => getDataAccount(companyId, page, limit, selectedType),
    enabled: !!companyId,
    refetchOnWindowFocus: false,
  });

  const totalPages = useMemo(() => {
    return accountData?.total ? Math.ceil(accountData.total / limit) : 1;
  }, [accountData]);
  console.log("TOTAL PAGES", totalPages);

  const filteredData = useMemo(() => {
    if (!accountData?.data) return [];
    if (!selectedType) return accountData.data;

    return accountData.data.filter((item) => item.type === selectedType);
  }, [accountData, selectedType]);

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, accountData?.total || 0);

  useEffect(() => {
    if (accountData?.total && accountData.total <= (page - 1) * limit) {
      setPage(1); // Reset page to 1 if the page number exceeds available data
    }
  }, [accountData, page]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoading} />

      <Group justify="space-between" p={20}>
        <Stack>
          <Text size="lg" fw={600}>
            Akun Keuangan
          </Text>
          <Select
            label="Filter berdasarkan Type"
            placeholder="Pilih Type"
            data={accountTypeOptions}
            value={selectedType}
            onChange={setSelectedType}
            clearable
          />

          <Group mt="md"></Group>
        </Stack>
        <Stack>
          <AddAccountModal companyId={companyId} refetchAccountData={refetchAccountData} />
        </Stack>
        <AccountTable data={filteredData} />
        {totalPages > 0 && (
          <>
            <Pagination mt={10} total={totalPages} value={page} onChange={setPage} />
            <Text mt={8} size="sm" c="dimmed">
              Show from {startIndex} to {endIndex} of {accountData?.total} data
            </Text>
          </>
        )}
      </Group>
    </Card>
  );
};
