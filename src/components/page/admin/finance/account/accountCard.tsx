import LoadingGlobal from "@/helper/styles/loading/loading-global";
import { Card, Text, Group, Stack, Loader, Pagination, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query"; // assumed path
import AddAccountModal from "./addAccountModal";
import { getDataAccount } from "@/api/account/getDataAccount";
import AccountTable from "@/components/common/table/accountTable";
import { useMemo, useState } from "react";
import { accountTypeOptions, typeOptions } from "@/constants/dictionary";

interface AccountCardProps {
  companyId: string;
}

export const AccountCard = ({ companyId }: AccountCardProps) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
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

  const totalPages = useMemo(() => Math.ceil((accountData?.total || 1) / rowsPerPage), [accountData]);

  const filteredData = useMemo(() => {
    if (!accountData?.data) return [];
    if (!selectedType) return accountData.data;

    return accountData.data.filter((item) => item.type === selectedType);
  }, [accountData, selectedType]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingGlobal visible={isLoading} />

      <Group justify="space-between" p={20}>
        <Stack>
          <Text size="lg" fw={600}>
            Account
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
        {totalPages > 1 && <Pagination mt={10} total={totalPages} value={page} onChange={setPage} />}
      </Group>
    </Card>
    // </Group>
  );
};
